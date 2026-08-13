"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Palette,
  FileText,
  Users,
  Image,
  Settings,
  LogOut,
} from "lucide-react";
import { logoutAction } from "@/actions/auth";
import { cn } from "@/lib/utils";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Package,
  FolderTree,
  Palette,
  FileText,
  Users,
  Image,
  Settings,
};

const nav = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/products", label: "Products", icon: "Package" },
  { href: "/admin/categories", label: "Categories", icon: "FolderTree" },
  { href: "/admin/customization-requests", label: "Customization Requests", icon: "Palette" },
  { href: "/admin/quote-requests", label: "Bulk Quote Requests", icon: "FileText" },
  { href: "/admin/customers", label: "Customers", icon: "Users" },
  { href: "/admin/media", label: "Media", icon: "Image" },
  { href: "/admin/settings", label: "Settings", icon: "Settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="border-b border-border p-6">
        <Link href="/admin" className="font-display text-lg font-bold uppercase tracking-wider">
          AaruthraaFashion
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">Admin Dashboard</p>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {nav.map((item) => {
          const Icon = icons[item.icon];
          const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-none px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <form action={logoutAction} className="border-t border-border p-4">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-none px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </form>
    </aside>
  );
}
