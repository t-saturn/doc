import { Search, Sun, Moon, Globe, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";

interface NavbarProps {
  onToggleTheme: () => void;
  isDark: boolean;
  onToggleSidebar: () => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

export function Navbar({ onToggleTheme, isDark, onToggleSidebar, isAdmin, onToggleAdmin }: NavbarProps) {
  return (
    <header className="top-0 z-50 sticky bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur border-b h-16">
      <div className="flex items-center gap-4 px-4 h-full">
        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="lg:hidden" onClick={onToggleSidebar}>
          <Menu className="size-5" />
        </Button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center bg-primary rounded-lg size-8">
            <span className="font-bold text-primary-foreground">D</span>
          </div>
          <h1 className="hidden sm:block font-semibold">DocuManager</h1>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="top-1/2 left-3 absolute size-4 text-muted-foreground -translate-y-1/2 transform" />
            <Input placeholder="Buscar documentación..." className="bg-muted/50 pl-10" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Globe className="size-4" />
                <span className="hidden sm:inline ml-2">ES</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>🇪🇸 Español</DropdownMenuItem>
              <DropdownMenuItem>🇺🇸 English</DropdownMenuItem>
              <DropdownMenuItem>🇫🇷 Français</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={onToggleTheme}>
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          {/* Admin Toggle */}
          <Button variant={isAdmin ? "default" : "outline"} size="sm" onClick={onToggleAdmin} className="hidden sm:flex">
            <User className="size-4" />
            <span className="ml-2">{isAdmin ? "Modo Admin" : "Modo Usuario"}</span>
          </Button>

          {/* Admin Badge (Mobile) */}
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
