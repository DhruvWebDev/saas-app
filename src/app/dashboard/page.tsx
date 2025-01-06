"use client";

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs'; // Assume this hook fetches the user and their role
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.unsafeMetadata.role === 'YOUTUBER') {
        router.push('/dashboard/youtuber');
      } else {
        router.push('/dashboard/editor');
      }
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return null;
}
