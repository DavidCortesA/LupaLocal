"use client"

import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Computer, Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { setTheme } = useTheme();

  const themes = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"/>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme(themes[0].value)}>
          {themes[0].label}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(themes[1].value)}>
          {themes[1].label}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(themes[2].value)}>
          {themes[2].label}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}