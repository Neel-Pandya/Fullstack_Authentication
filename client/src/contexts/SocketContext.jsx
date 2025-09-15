import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext({ socket: null });

const SocketProvider = ({ children }) => {
  const { authToken } = useAuthContext();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!authToken) {
      // disconnect if token is removed
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    // avoid duplicate socket
    if (socket) return;

    const newSocket = io(import.meta.env.VITE_SERVER_URL || "http://localhost:3000", {
      transports: ["websocket"],
      auth: { token: authToken },
      withCredentials: true,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [authToken]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
export default SocketProvider;
