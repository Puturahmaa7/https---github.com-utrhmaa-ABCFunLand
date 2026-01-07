"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-white text-2xl font-extrabold px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          ☰
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="z-[100] p-0">
        <VisuallyHidden>
          <SheetTitle>Menu Navigasi</SheetTitle>
        </VisuallyHidden>

        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
