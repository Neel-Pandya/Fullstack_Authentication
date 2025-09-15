import { Server } from "socket.io";
import { clientUrl, jwtAccessSecretKey } from "./config/env.config.js";
import jwt from "jsonwebtoken";

const createSocketIOServer = (server) => {
    // Map<userId, { user: userObj, sockets: Set<socketId> }>
    const onlineUsers = new Map();

    const io = new Server(server, {
        cors: {
            origin: clientUrl || "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
        transports: ["websocket"],
    });

    // Auth middleware
    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;
        if (!token) return next(new Error("Authentication error: no token"));

        try {
            const decoded = jwt.verify(token, jwtAccessSecretKey);
            socket.user = decoded.user; // { _id, name, ... }
            next();
        } catch (err) {
            console.error("Invalid token:", err.message);
            next(new Error("Authentication error: invalid token"));
        }
    });

    io.on("connection", (socket) => {
        const userId = socket.user._id;

        // Add socket to onlineUsers
        if (!onlineUsers.has(userId)) {
            onlineUsers.set(userId, { user: socket.user, sockets: new Set() });
        }
        onlineUsers.get(userId).sockets.add(socket.id);

        // --- Send online list to the new socket immediately ---
        const listForNewSocket = Array.from(onlineUsers.values())
            .map(u => u.user)
            .filter(u => u._id !== userId); // exclude self
        socket.emit("online-users", listForNewSocket);

        // --- Update all other sockets ---
        io.sockets.sockets.forEach(s => {
            if (s.id !== socket.id) {
                const listForOther = Array.from(onlineUsers.values())
                    .map(u => u.user)
                    .filter(u => u._id !== s.user._id);
                s.emit("online-users", listForOther);
            }
        });

        // Handle disconnect
        socket.on("disconnect", () => {
            const entry = onlineUsers.get(userId);
            if (entry) {
                entry.sockets.delete(socket.id);
                if (entry.sockets.size === 0) onlineUsers.delete(userId);
            }

            io.sockets.sockets.forEach(s => {
                const listForOther = Array.from(onlineUsers.values())
                    .map(u => u.user)
                    .filter(u => u._id !== s.user._id);
                s.emit("online-users", listForOther);
            });
        });
    });

    return io;
};

export default createSocketIOServer;
