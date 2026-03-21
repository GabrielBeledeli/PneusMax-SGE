"use client";

import { useTheme } from "@/app/hooks/useTheme";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="h-9 w-9 rounded-md bg-gray-700" />;
  }

  return (
    <Button
      onClick={toggleTheme}
      className="w-auto bg-transparent p-2 hover:bg-gray-700 focus:ring-0 focus:ring-offset-0 focus-visible:outline-none"
      aria-label="Mudar tema"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-text-light" />
      ) : (
        <Moon className="h-5 w-5 text-text-light" />
      )}
    </Button>
  );
}
