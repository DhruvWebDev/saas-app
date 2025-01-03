import Link from "next/link"
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
import { Badge } from "@/components/ui/badge"

// This would typically come from a database or API
const videos = [
  { id: '1', title: 'How to Build a Next.js App', status: 'Published', views: 10234, lastUpdated: '2023-07-01' },
  { id: '2', title: 'React Hooks Explained', status: 'Draft', views: 0, lastUpdated: '2023-06-28' },
  { id: '3', title: 'CSS Grid Tutorial', status: 'Processing', views: 0, lastUpdated: '2023-06-25' },
]

export default function VideosPage() {
  return (
    <div className="flex min-h-screen dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Videos</h1>
            <Button>Upload New Video</Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Your Videos</CardTitle>
              <CardDescription>
                Manage and track all your video content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell>
                        <Link href={`/dashboard/videos/${video.id}`} className="text-blue-500 hover:underline">
                          {video.title}
                        </Link>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>{video.views.toLocaleString()}</TableCell>
                      <TableCell>{video.lastUpdated}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
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

