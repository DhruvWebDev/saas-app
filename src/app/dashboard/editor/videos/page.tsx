"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video } from "lucide-react"

export default function EditorVideosPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Assigned Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((video) => (
          <Card key={video}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Video className="h-8 w-8" />
              <div>
                <CardTitle className="text-lg">Video Project {video}</CardTitle>
                <p className="text-sm text-muted-foreground">From: Creator Name</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Status:</span> In Progress
                </div>
                <div className="text-sm">
                  <span className="font-medium">Due Date:</span> March 30, 2024
                </div>
                <div className="text-sm">
                  <span className="font-medium">Tasks Completed:</span> 3/5
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}