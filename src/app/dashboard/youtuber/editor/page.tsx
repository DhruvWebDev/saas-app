"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, User } from "lucide-react";
import { useState } from "react";
import { Drawer } from "@/components/ui/drawer"; // Assuming you have a Drawer component
import axios from "axios"; // Axios for making API requests
import { Input } from "@/components/ui/input"; // Assuming you have Input components

export default function EditorsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editorName, setEditorName] = useState("");
  const [editorEmail, setEditorEmail] = useState("");
  const [error, setError] = useState<string | null>(null); // Track error for invalid input

  // Function to handle editor invitation
  const handleInviteEditor = async () => {
    if (!editorName || !editorEmail) {
      setError("Both name and email are required.");
      return;
    }
    const data = {
      email: editorEmail, name: editorName
    }
    console.log(data)
    
    try {
      const response = await axios.post("/api/add-editor-access", data);
      console.log("Editor added:", response.data);
      setEditorName(""); // Clear input after successful invitation
      setEditorEmail("");
      setIsDrawerOpen(false); // Close the drawer
    } catch (err) {
      console.error("Error adding editor:", err);
      setError("Failed to add the editor. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Editors</h1>
        <Button onClick={() => setIsDrawerOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Invite Editor
        </Button>
      </div>

      {/* List of Editors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((editor) => (
          <Card key={editor}>
            <CardHeader className="flex flex-row items-center gap-4">
              <User className="h-8 w-8" />
              <div>
                <CardTitle className="text-lg">John Doe {editor}</CardTitle>
                <p className="text-sm text-muted-foreground">Video Editor</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Active Projects:</span> 3
                </div>
                <div className="text-sm">
                  <span className="font-medium">Completed Projects:</span> 15
                </div>
                <Button variant="outline" className="w-full mt-4">View Profile</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Drawer for Inviting Editor */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Invite Editor">
        <div className="space-y-4">
          <Input
            value={editorName}
            onChange={(e) => setEditorName(e.target.value)}
            placeholder="Editor Name"
            className="w-full"
          />
          <Input
            value={editorEmail}
            onChange={(e) => setEditorEmail(e.target.value)}
            placeholder="Editor Email"
            type="email"
            className="w-full"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={handleInviteEditor} className="w-full mt-4">
            Invite
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
