"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconBrandTabler,
  IconUserBolt,
  IconSettings,
  IconArrowLeft,
  IconVideo,
  IconUsers,
  IconMessageCircle,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function YouTuberDashboard() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard/youtuber",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Videos",
      href: "/dashboard/youtuber/videos",
      icon: (
        <IconVideo className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Editors",
      href: "/dashboard/youtuber/editors",
      icon: (
        <IconUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Chat",
      href: "/dashboard/youtuber/chat",
      icon: (
        <IconMessageCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/dashboard/youtuber/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/dashboard/youtuber/settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/logout",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "John Doe",
                href: "/dashboard/youtuber/profile",
                icon: (
                  <Image
                    src="/placeholder-avatar.jpg"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <YouTuberContent />
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href="/dashboard/youtuber/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        CreatorHub
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      href="/dashboard/youtuber/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const YouTuberContent = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h1 className="text-2xl font-bold mb-4">YouTuber dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard title="Total Videos" value="42" />
          <DashboardCard title="Views This Month" value="1.2M" />
          <DashboardCard title="Subscribers" value="100K" />
          <DashboardCard title="Revenue This Month" value="$5,230" />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3 bg-gray-100 dark:bg-neutral-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Recent Videos</h2>
            {/* Add a list or table of recent videos here */}
          </div>
          <div className="w-full md:w-1/3 bg-gray-100 dark:bg-neutral-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Upcoming Tasks</h2>
            {/* Add a list of upcoming tasks or deadlines here */}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="bg-gray-100 dark:bg-neutral-800 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};
