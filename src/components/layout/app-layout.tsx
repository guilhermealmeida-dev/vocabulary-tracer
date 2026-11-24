"use client";

import { logout } from "@/services/auth/auth.service";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface AppHeaderProps {
  userName: string;
}

export function AppHeader({ userName }: AppHeaderProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setIsLoggingOut(true);

      await logout();

      router.replace("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/home" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Vocabulary Tracer"
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain"
          />

          <span className="text-xl font-bold text-slate-900 dark:text-white">
            Vocabulary Tracer
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
          >
            About
          </Link>

          <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 sm:inline">
            {userName}
          </span>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isLoggingOut ? "Signing out..." : "Logout"}
          </button>
        </div>
      </div>
    </header>
  );
}