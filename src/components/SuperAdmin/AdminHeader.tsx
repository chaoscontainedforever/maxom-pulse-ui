
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, LogOut, Menu, Search, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminHeaderProps {
  openSidebar: () => void;
  isImpersonating?: boolean;
  impersonatedUser?: string;
  endImpersonation?: () => void;
  onSignOut?: () => void;
}

const AdminHeader = ({ 
  openSidebar, 
  isImpersonating = false,
  impersonatedUser = "",
  endImpersonation,
  onSignOut
}: AdminHeaderProps) => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={openSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative max-w-md hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-9 w-[300px]" 
            />
          </div>
        </div>

        {isImpersonating && (
          <div className="flex-1 mx-4 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <Badge variant="outline" className="bg-amber-200 border-amber-300 text-amber-800 mr-2">
                Impersonating
              </Badge>
              <span className="text-sm font-medium">{impersonatedUser}</span>
            </div>
            <Button size="sm" variant="ghost" className="text-amber-800" onClick={endImpersonation}>
              Exit
            </Button>
          </div>
        )}

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-8 h-8 rounded-full bg-gradient-card1 flex items-center justify-center text-white cursor-pointer">
                <User className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onSignOut} className="cursor-pointer text-red-600 flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
