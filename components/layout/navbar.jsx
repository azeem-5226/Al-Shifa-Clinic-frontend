"use client";
import { useState } from "react";
import { LogOut, Menu, X, Settings, Stethoscope, Key } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { getSidebarLinks } from "./sidebar";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
function Navbar() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const sidebarLinks = getSidebarLinks(session?.user?.role);
  return <>
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open sidebar</span>
        </Button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1" />
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", className: "relative h-8 w-8 rounded-full" })}>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuGroup>
                <div className="px-2 py-1.5 text-sm font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session?.user?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user?.role || "Doctor"}
                    </p>
                  </div>
                </div>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href="/settings" className="w-full flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings" className="w-full flex items-center cursor-pointer">
                    <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Change Password</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })} className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950 cursor-pointer flex items-center w-full">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      </header>

      {
    /* Mobile Menu Overlay */
  }
      {isMobileMenuOpen && <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-background pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="ml-auto -mr-2">
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <div className="px-4 mb-8">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Stethoscope className="h-6 w-6 shrink-0" />
                <span className="truncate">{status === "loading" ? "" : session?.user?.clinicName || "ClinicOS"}</span>
              </h2>
            </div>
            <nav className="flex-1 space-y-1 px-2">
              {sidebarLinks.map((link) => {
    const Icon = link.icon;
    const isActive = pathname === link.href || link.href !== "/" && pathname.startsWith(link.href);
    return <Link
      key={link.href}
      href={link.href}
      onClick={() => setIsMobileMenuOpen(false)}
      className={cn(
        "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors",
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted hover:text-foreground text-muted-foreground"
      )}
    >
                    <Icon className="h-5 w-5" />
                    {link.title}
                  </Link>;
  })}
            </nav>
            <div className="mt-auto px-2">
              <Link
    href="/settings"
    onClick={() => setIsMobileMenuOpen(false)}
    className={cn(
      "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors",
      pathname === "/settings" ? "bg-primary text-primary-foreground" : "hover:bg-muted hover:text-foreground text-muted-foreground"
    )}
  >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </div>
          </div>
        </div>}
    </>;
}
export {
  Navbar
};
