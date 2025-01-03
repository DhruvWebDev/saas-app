"use client";

import React from "react";
import { YouTuberDashboard } from '@/components/youtuber-dashboard-sidebar';

export default function YouTuberDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <YouTuberDashboard />

    </div>
  );
}

