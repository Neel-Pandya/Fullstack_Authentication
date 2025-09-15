import React, { useState, useEffect } from "react";
import {
  Box, List, ListItem, ListItemAvatar, ListItemText,
  Avatar, Typography, Divider, Paper, TextField, IconButton
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSocket } from "../contexts/SocketContext";

export default function ChatPage() {
  const [users, setUsers] = useState([]); // online users
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { socket } = useSocket();

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: "You", text: input }]);
    setInput("");
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("online-users", (onlineUsers) => {
      setUsers(onlineUsers);
      console.log(onlineUsers)
    });

    return () => {
      socket.off("online-users");
    };
  }, [socket, users]);

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default", color: "text.primary" }}>
      {/* Left Sidebar */}
      <Paper elevation={3} sx={{ width: 280, borderRight: "1px solid #333", overflowY: "auto" }}>
        <Typography variant="h6" sx={{ p: 2 }}>Users</Typography>
        <Divider />
        <List>
          {users.length > 0 ? users.map((user) => (
            <ListItem key={user._id} onClick={() => setSelectedUser(user)}
                      selected={selectedUser?._id === user._id}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: user.status === "online" ? "green" : "grey" }}>
                  {user.name.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={user.status}
                secondaryTypographyProps={{ style: { color: user.status === "online" ? "#4caf50" : "#9e9e9e" } }}
              />
            </ListItem>
          )) : (
            <Typography sx={{ p: 2 }} color="text.secondary">No users online</Typography>
          )}
        </List>
      </Paper>

      {/* Chat Section */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {selectedUser ? (
          <>
            <Paper elevation={2} sx={{ p: 2, borderBottom: "1px solid #333", display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: selectedUser.status === "online" ? "green" : "grey" }}>
                {selectedUser.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1">{selectedUser.name}</Typography>
                <Typography variant="caption" color={selectedUser.status === "online" ? "success.main" : "gray"}>
                  {selectedUser.status}
                </Typography>
              </Box>
            </Paper>

            <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
              {messages.length > 0 ? messages.map((msg, i) => (
                <Box key={i} sx={{ mb: 1, display: "flex", justifyContent: msg.sender === "You" ? "flex-end" : "flex-start" }}>
                  <Paper sx={{ p: 1.5, maxWidth: "70%", bgcolor: msg.sender === "You" ? "primary.main" : "background.paper", color: msg.sender === "You" ? "#fff" : "text.primary" }}>
                    <Typography variant="body2">{msg.text}</Typography>
                  </Paper>
                </Box>
              )) : (
                <Typography color="text.secondary" align="center">Start a conversation with {selectedUser.name}</Typography>
              )}
            </Box>

            <Paper sx={{ display: "flex", p: 1, borderTop: "1px solid #333" }}>
              <TextField fullWidth variant="outlined" size="small" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)}
                         sx={{ bgcolor: "background.paper", borderRadius: 2 }} />
              <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}><SendIcon /></IconButton>
            </Paper>
          </>
        ) : (
          <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "text.secondary" }}>
            <Typography variant="h6">Select a user to start chatting</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
