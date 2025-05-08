"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Ensure theme loads correctly on the client

  return (
    <button
      // onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="relative flex h-9 w-16 items-center rounded-full bg-gray-300 dark:bg-[#303030] p-1 transition-colors"
    >
      <div
        className={`absolute left-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md transition-transform ${
          resolvedTheme === "dark" ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {resolvedTheme === "light" ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          <Moon className="h-5 w-5 text-gray-400" />
        )}
      </div>
    </button>
  );
}
