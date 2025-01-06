'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Youtube, Edit } from 'lucide-react'
import { Boxes } from '@/components/ui/background-boxes'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser()
  const [selectedRole, setSelectedRole] = useState<'youtuber' | 'editor' | null>(null)
  const [handleName, setHandleName] = useState<string>('')

  const handleSelection = async (role: 'youtuber' | 'editor') => {
    if (role === "youtuber" && !handleName) {
      toast({
        title: 'Error',
        description: 'Please enter your YouTube handle.',
        variant: 'destructive',
      })
      return
    }

    // Prepare data for POST request
    const data = {
      user_id: user?.id,
      email: user?.primaryEmailAddress?.emailAddress,
      name: user?.fullName,
      handleName: role === 'youtuber' ? handleName : null, // Only send handleName for youtubers
      imageUrl: user?.imageUrl,
    }

    try {
      if (role === 'youtuber') {
        await axios.post('/api/onboarding-yt', data)
        router.push("/yt-auth")
      } else if (role === 'editor') {
        await axios.post('/api/onboarding-editors', data)
      }

      setSelectedRole(role)

      toast({
        title: `Welcome, ${role === 'youtuber' ? 'Creator' : 'Editor'}!`,
        description: `You've chosen to continue as a ${role}. Let's get you set up.`,
      })

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-grid-white/[0.2] relative">
      <Boxes />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <Card className="w-full max-w-md relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-20" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-3xl font-bold text-center text-white">Welcome to CreatorHub</CardTitle>
          <CardDescription className="text-center text-gray-200">Choose your role to get started</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 relative z-10">
          <Button
            variant={selectedRole === 'youtuber' ? 'default' : 'outline'}
            className={`h-24 text-lg transition-all ${
              selectedRole === 'youtuber' ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-600/20'
            }`}
            onClick={() => handleSelection('youtuber')}
          >
            <Youtube className="mr-2 h-8 w-8" />
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold">I'm a Creator</span>
              <span className="text-sm opacity-80">I create and upload content</span>
            </div>
          </Button>
          {selectedRole === 'youtuber' && (
            <div className="mt-4">
              <input
                type="text"
                className="w-full p-2 border rounded-md text-black"
                placeholder="Enter your YouTube handle"
                value={handleName}
                onChange={(e) => setHandleName(e.target.value)}
              />
            </div>
          )}
          <Button
            variant={selectedRole === 'editor' ? 'default' : 'outline'}
            className={`h-24 text-lg transition-all ${
              selectedRole === 'editor' ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-purple-600/20'
            }`}
            onClick={() => handleSelection('editor')}
          >
            <Edit className="mr-2 h-8 w-8" />
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold">I'm an Editor</span>
              <span className="text-sm opacity-80">I edit and manage content</span>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
