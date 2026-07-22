"use client";

import Link from "next/link";
import { Bell, Plus } from "lucide-react";
import ThemeSwitcher from "./theme-switcher";

const HeaderComponent = () => {
  return (
    <header className="flex h-20 w-full items-center    px-10 lg:px-20 max-w-7xl mx-auto">


      <div className="flex items-center gap-2 ml-auto ">
        <ThemeSwitcher />
        <Link
          href="/add-a-word"
          className="flex items-center gap-2 rounded-md bg-accent px-2 py-1 font-semibold tracking-tighter text-primary-foreground transition-all duration-300 hover:bg-accent-hover md:px-5 md:py-2.5"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden md:block">Thêm từ</span>
        </Link>
        <span className="px-2 text-subtle">|</span>
        <Bell className="h-5 w-5 text-foreground" />
      </div>
    </header>
  );
};

export default HeaderComponent;
