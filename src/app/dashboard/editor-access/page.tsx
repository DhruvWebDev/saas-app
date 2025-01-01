"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

// Mock data for editors
const initialEditors = [
  { id: 1, name: "John Doe", email: "john@example.com", isActive: true },
  { id: 2, name: "Jane Smith", email: "jane@example.com", isActive: false },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", isActive: true },
]

export default function EditorAccessPage() {
  const [editors, setEditors] = useState(initialEditors)
  const [newEditor, setNewEditor] = useState({ name: "", email: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddEditor = () => {
    if (newEditor.name && newEditor.email) {
      setEditors([
        ...editors,
        { ...newEditor, id: editors.length + 1, isActive: true },
      ])
      setNewEditor({ name: "", email: "" })
      setIsDialogOpen(false)
    }
  }

  const toggleEditorStatus = (id: number) => {
    setEditors(
      editors.map((editor) =>
        editor.id === id
          ? { ...editor, isActive: !editor.isActive }
          : editor
      )
    )
  }

  return (
    <div className="flex min-h-screen dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Editor Access Management</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Add New Editor</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Editor</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new editor to grant access.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newEditor.name}
                      onChange={(e) =>
                        setNewEditor({ ...newEditor, name: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEditor.email}
                      onChange={(e) =>
                        setNewEditor({ ...newEditor, email: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddEditor}>Add Editor</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Editors</CardTitle>
              <CardDescription>
                Manage access for your video editors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {editors.map((editor) => (
                    <TableRow key={editor.id}>
                      <TableCell>{editor.name}</TableCell>
                      <TableCell>{editor.email}</TableCell>
                      <TableCell>
                        {editor.isActive ? (
                          <span className="text-green-500">Active</span>
                        ) : (
                          <span className="text-red-500">Inactive</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Switch
                            checked={editor.isActive}
                            onCheckedChange={() => toggleEditorStatus(editor.id)}
                          />
                          <span className="ml-2">
                            {editor.isActive ? "Deactivate" : "Activate"}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

