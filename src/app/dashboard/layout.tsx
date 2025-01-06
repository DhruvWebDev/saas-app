"use client"
import { Sidebar } from '@/components/sidebar';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { role?: string };
}

export default function DashboardLayout({
  children,
  params
}: DashboardLayoutProps) {
    const {user} = useUser();

  const isCreator = user?.unsafeMetadata?.role === "YOUTUBER"

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-64 hidden md:block" isCreator={isCreator} />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}