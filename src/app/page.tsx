import Link from "next/link"
import { ArrowRight, Video, Edit, Upload, Youtube, CheckCircle, Users, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignedIn, SignedOut, SignIn, SignInButton } from "@clerk/nextjs"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Minimal Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-white/5">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
            Dashboard
            </Link>
          </SignedIn>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium text-gray-400 hover:text-white transition-colors" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium text-gray-400 hover:text-white transition-colors" href="#">
            Docs
          </Link>
          <Link className="text-sm font-medium text-gray-400 hover:text-white transition-colors" href="#">
            Pricing
          </Link>
          <Button variant="ghost" className="text-gray-400 hover:text-white">Sign In</Button>
          <Button className="bg-white text-black hover:bg-gray-200">Get Started</Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 border-b border-white/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none max-w-3xl mx-auto">
                  The Creator Management Platform for{' '}
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    YouTube Excellence
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Streamline your content workflow. Connect creators with editors, manage reviews, 
                  and publish directly to YouTube - all in one powerful platform.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-white text-black hover:bg-gray-200">
                  Start Creating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-gray-800 text-gray-300 hover:bg-gray-800">
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-b border-white/5">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Seamless Video Management",
                  description: "Upload, organize, and track your video projects with AI-powered insights.",
                  icon: Video
                },
                {
                  title: "Editor Collaboration",
                  description: "Connect with editors and manage revisions with real-time feedback.",
                  icon: Edit
                },
                {
                  title: "Direct YouTube Upload",
                  description: "Publish approved videos directly to your channel with one click.",
                  icon: Upload
                },
                {
                  title: "Advanced Analytics",
                  description: "Track performance metrics and optimize your content strategy.",
                  icon: Zap
                },
                {
                  title: "Team Management",
                  description: "Manage your editing team and track progress effortlessly.",
                  icon: Users
                },
                {
                  title: "Quality Assurance",
                  description: "Built-in review system with frame-by-frame commenting.",
                  icon: CheckCircle
                }
              ].map((feature, i) => (
                <Card key={i} className="bg-gradient-to-b from-gray-900 to-black border-gray-800 hover:border-gray-700 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <feature.icon className="w-6 h-6 text-blue-500" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400 mt-2">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-black to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple, Yet Powerful Workflow
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform streamlines the entire content creation process, from upload to publish.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                    <Upload className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="font-bold">Upload & Assign</h3>
                </div>
                <p className="text-gray-400">
                  Upload your raw footage and assign it to your editing team.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                    <Edit className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="font-bold">Review & Approve</h3>
                </div>
                <p className="text-gray-400">
                  Review edits and provide feedback in real-time.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                    <Youtube className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="font-bold">Publish & Monitor</h3>
                </div>
                <p className="text-gray-400">
                  Publish directly to YouTube and track performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t border-white/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Workflow?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of creators who are streamlining their content creation process.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-white text-black hover:bg-gray-200">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-gray-800 text-gray-300 hover:bg-gray-800">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-black py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <Link href="#" className="text-lg font-bold">CreatorFlow</Link>
              <p className="text-sm text-gray-400">
                The ultimate platform for YouTube content creators and their teams.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms</Link></li>
                <li><Link href="#" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-400">
              © 2024 CreatorFlow. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white">
                Terms
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                Privacy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}