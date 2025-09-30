'use client';

import { Search, Sun, Moon, Globe, Menu, UserRound } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import Image from 'next/image';

import { useTheme } from '@/components/providers/theme-provider';
import { useUIState } from '@/components/providers/ui-state';

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { isAdmin, toggleAdmin, toggleSidebar } = useUIState();

  return (
    <header className="top-0 z-50 sticky bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur border-b h-16">
      <div className="flex items-center px-4 h-full">
        <div className="flex flex-row items-center gap-2">
          <Image
            src="https://raw.githubusercontent.com/t-saturn/resources/mdk/img/logo/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="rounded-lg object-contain"
          />
          <p className="font-bold text-xl">Documentación</p>
        </div>

        {/* Right actions */}
        <div className="flex flex-1 justify-end items-center gap-2 ml-auto">
          {/* Toggle sidebar (solo mobile) */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={toggleSidebar}
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </Button>

          {/* Search (oculto en mobile) */}
          <div className="hidden md:block relative w-full max-w-md">
            <Search className="top-1/2 left-3 absolute size-4 text-muted-foreground -translate-y-1/2 pointer-events-none" />
            <Input
              placeholder="Buscar documentación..."
              className="bg-muted/50 pl-10"
              inputMode="search"
              aria-label="Buscar documentación"
            />
          </div>

          {/* Idioma */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Cambiar idioma"
              >
                <Globe className="size-4" />
                <span className="hidden sm:inline ml-2">ES</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tema */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          {/* Modo Admin / Usuario */}
          <Button
            variant={isAdmin ? 'default' : 'outline'}
            size="sm"
            onClick={toggleAdmin}
            className="hidden sm:flex"
            aria-pressed={isAdmin}
            aria-label="Cambiar modo"
          >
            <UserRound className="size-4" />
            <span className="ml-2">{isAdmin ? 'Modo Admin' : 'Modo Usuario'}</span>
          </Button>

          {/* Badge Admin en pantallas pequeñas */}
          {isAdmin && (
            <Badge
              variant="default"
              className="sm:hidden"
            >
              Admin
            </Badge>
          )}
        </div>
      </div>
    </header>
  );
}
