import { notFound } from "next/navigation"
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
import { Badge } from "@/components/ui/badge"

// This would typically come from a database or API
const videos = [
  { id: '1', title: 'How to Build a Next.js App', status: 'Published', views: 10234, lastUpdated: '2023-07-01', description: 'A comprehensive guide to building apps with Next.js' },
  { id: '2', title: 'React Hooks Explained', status: 'Draft', views: 0, lastUpdated: '2023-06-28', description: 'Deep dive into React Hooks and their use cases' },
  { id: '3', title: 'CSS Grid Tutorial', status: 'Processing', views: 0, lastUpdated: '2023-06-25', description: 'Master CSS Grid layout with this step-by-step tutorial' },
]

export default function VideoPage({ params }: { params: { id: string } }) {
  const video = videos.find(v => v.id === params.id)

  if (!video) {
    notFound()
  }

  return (
    <div className="flex min-h-screen dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{video.title}</h1>
            <Button>Edit Video</Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Video Details</CardTitle>
              <CardDescription>
                Manage and view details for this video
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-gray-800 rounded-lg"></div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p>{video.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <Badge
                    className={
                      video.status === 'Published'
                        ? 'bg-green-500'
                        : video.status === 'Processing'
                        ? 'bg-yellow-500'
                        : ''
                    }
                    variant={video.status === 'Draft' ? 'outline' : 'default'}
                  >
                    {video.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {video.lastUpdated}
                </div>
              </div>
              <div>
                <span className="font-semibold">Views: </span>
                {video.views.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

