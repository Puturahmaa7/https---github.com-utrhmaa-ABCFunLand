"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type SidebarItemProps = {
  label: string;
  iconSrc: string;
  href: string;
};

export const SidebarItem = ({ label, iconSrc, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      variant={isActive ? "sidebarOutline" : "sidebar"}
      className="h-[52px] justify-start"
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          width={28}
          height={28}
          className="object-contain"
        />
        {label}
      </Link>
    </Button>
    /*
    <Link

      href={href}
      className={cn(
        "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all",
        isActive
          ? "bg-blue-100 text-blue-700 shadow-sm"
          : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
      )}
    >
      <Image
        src={iconSrc}
        alt={label}
        width={28}
        height={28}
        className="object-contain"
      />
      <span className="normal-case">{label}</span>
    </Link>
    */
  );
};
