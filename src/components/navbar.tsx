"use client";

import { Search, Sun, Moon, Globe, Menu, UserRound } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import Image from "next/image";

import { useTheme } from "@/components/providers/theme-provider";
import { useUIState } from "@/components/providers/ui-state";

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { isAdmin, toggleAdmin, toggleSidebar } = useUIState();

  return (
    <header className="top-0 z-50 sticky bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur border-b h-16">
      <div className="flex items-center px-4 h-full">
        <Image src="https://raw.githubusercontent.com/t-saturn/resources/gra/img/logo.png" alt="Logo" width={32} height={32} className="rounded-lg object-contain" />

        <div className="flex flex-1 justify-end items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={toggleSidebar}>
            <Menu className="size-5" />
          </Button>

          <div className="hidden md:block relative w-full max-w-md">
            <Search className="top-1/2 left-3 absolute size-4 text-muted-foreground -translate-y-1/2 transform" />
            <Input placeholder="Buscar documentación..." className="bg-muted/50 pl-10" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Globe className="size-4" />
                <span className="hidden sm:inline ml-2">ES</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Cambiar tema">
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          <Button variant={isAdmin ? "default" : "outline"} size="sm" onClick={toggleAdmin} className="hidden sm:flex">
            <UserRound className="size-4" />
            <span className="ml-2">{isAdmin ? "Modo Admin" : "Modo Usuario"}</span>
          </Button>

          {isAdmin && (
            <Badge variant="default" className="sm:hidden">
              Admin
            </Badge>
          )}
        </div>
      </div>
    </header>
  );
}
