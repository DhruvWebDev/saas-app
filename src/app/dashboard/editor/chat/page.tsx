"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios"; // Use axios to call backend APIs
import { User } from "lucide-react"; // Adjust based on your UI library
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Editor, EditorAccess, Message } from "@prisma/client";
import { messagePayload } from "../../../../../type";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState<Message>(""); // State for the new message
  const [selectedCreator, setSelectedCreator] = useState(null); // Track selected creator
  const [editors, setEditors] = useState([]);
  const { user } = useUser();

  const userId = user?.id;

  // Fetch the list of editors (creators)
  useEffect(() => {
    const fetchEditors = async () => {
      try {
        const response:EditorAccess = await axios.get("/api/editors", { params: { userId } });
        // Assuming the response contains a list of editors
        setEditors(response.data); // Set fetched editors to state
      } catch (error) {
        console.error("Error fetching editors:", error);
      }
    };

    fetchEditors();
  }, [userId]);

  // Fetch messages for the selected creator
  useEffect(() => {
    if (!selectedCreator) return;

    const fetchMessages = async () => {
      try {
        const response: Message = await axios.get("/api/messages", {
          params: { creatorId: selectedCreator, userId },
        });
        setMessages(response?.data); // Set fetched messages to state
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedCreator, userId]);

  // Function to handle sending a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages

    const message:messagePayload = {
      senderId: userId,
      receiverId: selectedCreator, // The selected creator as the receiver
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
    <div className="h-[calc(100vh-2rem)] flex gap-4">
      {/* Sidebar */}
      <Card className="w-64 p-4">
        <div className="font-semibold mb-4">Conversations</div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {/* Render the list of editors/creators */}
          {editors?.map((creator) => (
            <Button
              key={creator.id}
              variant={selectedCreator === creator.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 mb-1"
              onClick={() => setSelectedCreator(creator.id)} // Set the selected creator
            >
              <User className="h-4 w-4" />
              {creator.name}
            </Button>
          ))}
        </ScrollArea>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 p-4 flex flex-col">
        {selectedCreator ? (
          <>
            <div className="flex items-center gap-2 p-2 border-b">
              <User className="h-6 w-6" />
              <div>
                <div className="font-semibold">{`Creator ${selectedCreator}`}</div>
                <div className="text-sm text-muted-foreground">YouTube Creator</div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === userId ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.senderId === userId
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.content}
                      <div className="text-xs mt-1 opacity-70">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <Button onClick={sendMessage}>Send</Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
      </Card>
    </div>
  );
}
