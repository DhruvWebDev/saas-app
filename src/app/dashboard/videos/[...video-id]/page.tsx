"use client"

import { useState } from "react"
import { CheckCircle, XCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function VideoReviewPage() {
  const [feedback, setFeedback] = useState("")

  return (
    <div className="p-6">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Video Review</CardTitle>
          <CardDescription>
            Review and approve the edited video before publishing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-video rounded-lg bg-gray-800">
            <iframe
              className="h-full w-full"
              src="about:blank"
              title="Video preview"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Feedback for Editor</h3>
            <Textarea
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" className="gap-2">
            <XCircle className="h-4 w-4" />
            Request Changes
          </Button>
          <Button className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Approve & Publish
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

