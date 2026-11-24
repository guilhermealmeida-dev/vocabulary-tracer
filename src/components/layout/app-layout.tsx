"use client";
import { logout } from "@/services/auth/auth.service";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        <span className="text-xl font-bold text-slate-900 dark:text-white">
          Vocabulary Tracer
        </span>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
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
