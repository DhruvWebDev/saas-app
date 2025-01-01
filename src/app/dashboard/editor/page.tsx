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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type Video = {
  id: number
  title: string
  status: "In Progress" | "Pending Review" | "Completed"
  dueDate: string
}

const initialVideos: Video[] = [
  { id: 1, title: "Advanced React Hooks", status: "In Progress", dueDate: "2023-07-15" },
  { id: 2, title: "Next.js 13 Features", status: "Pending Review", dueDate: "2023-07-10" },
  { id: 3, title: "CSS Grid Mastery", status: "Completed", dueDate: "2023-07-05" },
]

export default function EditorDashboardPage() {
  const [videos, setVideos] = useState<Video[]>(initialVideos)

  const handleStatusChange = (videoId: number, newStatus: Video['status']) => {
    setVideos(videos.map(video => 
      video.id === videoId ? { ...video, status: newStatus } : video
    ))
  }

  const getStatusBadge = (status: Video['status']) => {
    switch (status) {
      case "In Progress":
        return <Badge>In Progress</Badge>
      case "Pending Review":
        return <Badge variant="outline">Pending Review</Badge>
      case "Completed":
        return <Badge variant="secondary">Completed</Badge>
    }
  }

  return (
    <div className="flex min-h-screen dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Editor Dashboard</h1>
              <Button>Upload New Video</Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Videos in Progress</CardTitle>
                  <CardDescription>Currently editing</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{videos.filter(v => v.status === "In Progress").length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pending Review</CardTitle>
                  <CardDescription>Awaiting creator approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{videos.filter(v => v.status === "Pending Review").length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Completed Videos</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{videos.filter(v => v.status === "Completed").length}</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Videos</CardTitle>
                <CardDescription>
                  Manage and track your video editing projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {videos.map((video) => (
                      <TableRow key={video.id}>
                        <TableCell>{video.title}</TableCell>
                        <TableCell>
                          <Select
                            value={video.status}
                            onValueChange={(value) => handleStatusChange(video.id, value as Video['status'])}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue>{getStatusBadge(video.status)}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="In Progress">
                                {getStatusBadge("In Progress")}
                              </SelectItem>
                              <SelectItem value="Pending Review">
                                {getStatusBadge("Pending Review")}
                              </SelectItem>
                              <SelectItem value="Completed">
                                {getStatusBadge("Completed")}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{video.dueDate}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            {video.status === "Completed" ? "Feedback" : video.status === "Pending Review" ? "View" : "Edit"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

