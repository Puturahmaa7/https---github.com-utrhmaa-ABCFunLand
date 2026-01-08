"use client";

import Link from "next/link";
import Image from "next/image";

import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";

type SidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-[260px] bg-white border-r border-blue-100 shadow-sm flex flex-col",
        className
      )}
    >
      {/* Logo */}
      <Link href="/learn">
        <div className="flex justify-center py-8 border-b border-blue-100">
          <div className="relative h-16 w-40">
            <Image
              src="/images/Logo.png"
              alt="ABC Fun Learn"
              fill
              className="object-contain"
              sizes="160px"
              priority
            />
          </div>
        </div>
      </Link>

      {/* Menu */}
      <nav className="flex flex-1 flex-col gap-2 px-4 pt-6">
        <SidebarItem
          label="Belajar"
          href="/learn"
          iconSrc="/images/Learn.png"
        />
        <SidebarItem label="Kuis" href="/quiz" iconSrc="/images/Quiz.png" />
      </nav>

      {/* User */}
      <div className="px-4 py-6 border-t border-blue-100">
        <ClerkLoading>
          <div className="flex justify-center">
            <Loader className="h-5 w-5 animate-spin text-blue-400" />
          </div>
        </ClerkLoading>

        <ClerkLoaded>
          <div className="flex justify-center">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                  userButtonPopoverCard:
                    "rounded-2xl shadow-md border border-blue-100",
                },
              }}
            />
          </div>
        </ClerkLoaded>
      </div>
    </aside>
  );
};
