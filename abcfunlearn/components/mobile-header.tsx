"use client";

import dynamic from "next/dynamic";

const MobileSidebar = dynamic(
  () => import("./mobile-sidebar").then((m) => m.MobileSidebar),
  { ssr: false }
);

export const MobileHeader = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-[50px] w-full items-center border-b bg-blue-600 px-4 lg:hidden">
      <MobileSidebar />
    </nav>
  );
};
