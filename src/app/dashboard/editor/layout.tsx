"use client";

import React from "react";
import { EditorDashboard } from '@/components/editor-dashboard-sidebar';

export default function EditorDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <EditorDashboard />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
