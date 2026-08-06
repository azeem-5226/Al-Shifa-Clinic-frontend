"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LayoutDashboard, Users, Stethoscope, Wallet, Settings, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

export const getSidebarLinks = (role) => {
  if (role === "admin") {
    return [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard
      },
      {
        title: "Manage Doctors",
        href: "/admin/doctors",
        icon: UserPlus
      }
    ];
  }
  return [
    {
      title: "Dashboard",
      href: "/doctor/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Patients",
      href: "/doctor/patients",
      icon: Users
    },
    {
      title: "Earnings",
      href: "/doctor/earnings",
      icon: Wallet
    }
  ];
};

function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  
  const links = getSidebarLinks(session?.user?.role);

  return (
    <nav className="hidden border-r bg-muted/20 md:block md:w-64 lg:w-72">
      <div className="flex h-full flex-col px-3 py-4">
        <div className="mb-8 px-4">
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Stethoscope className="h-6 w-6 shrink-0" />
            <span className="truncate">{status === "loading" ? "" : session?.user?.clinicName || "ClinicOS"}</span>
          </h2>
        </div>
        <div className="flex-1 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "hover:bg-primary/10 hover:text-primary text-muted-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "")} />
                {link.title}
              </Link>
            );
          })}
        </div>
        <div className="mt-auto">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
              pathname === "/settings" ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "hover:bg-primary/10 hover:text-primary text-muted-foreground"
            )}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}

export { Sidebar };
