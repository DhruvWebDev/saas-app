import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { UploadForm } from "@/components/uploadForm"

export default function UploadsPage() {
  return (
    <div className="flex min-h-screen dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Upload Video</h1>
            <p className="text-muted-foreground">
              Upload your edited videos for review and publishing
            </p>
          </div>
          <UploadForm />
        </main>
      </div>
    </div>
  )
}

