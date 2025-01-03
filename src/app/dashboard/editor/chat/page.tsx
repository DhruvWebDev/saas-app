"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios"; // Use axios to call backend APIs

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(""); // State for the new message
  const { user } = useUser();

  const userId = user?.id;

  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/messages", {
          params: { userId },
        });
        setMessages(response.data); // Set fetched messages to state
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [userId]);

  // Function to handle sending a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages

    const message = {
      senderId: userId,
      receiverId: userId, // Replace with the actual receiver ID
      content: newMessage,
    };

    try {
      const response = await axios.post("/api/messages", message);
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage(""); // Clear the input field after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              textAlign: msg.senderId === userId ? "right" : "left",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "8px",
              maxWidth: "60%",
              marginLeft: msg.senderId === userId ? "auto" : "0",
              marginRight: msg.senderId === userId ? "0" : "auto",
              backgroundColor: msg.senderId === userId ? "#333" : "#f1f1f1", // Dark for sender, light for receiver
              color: msg.senderId === userId ? "white" : "black", // Text color
            }}
          >
            <p>
              <strong>{msg.senderId === userId ? "You" : msg.senderType}</strong>
            </p>
            <p>{msg.content}</p>
            <p
              style={{
                fontSize: "0.8em",
                color: msg.senderId === userId ? "#aaa" : "gray",
              }}
            >
              {new Date(msg.createdAt).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
