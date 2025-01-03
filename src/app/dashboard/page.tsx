"use client";

import { EditorDashboard } from '@/components/editor-dashboard-sidebar';
import { YouTuberDashboard } from '@/components/youtuber-dashboard-sidebar';
import { useUser } from '@clerk/nextjs'; // Assume this hook fetches the user and their role
export default function DashboardPage() {
  // const { user } = useUser();
  const user = {
    unsafeMetadata: {
      role: 'YOUTUBER'
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user.unsafeMetadata.role === 'YOUTUBER' ? (
        <YouTuberDashboard />
      ) : (
        <EditorDashboard />
      )}
    </>
  );
}

