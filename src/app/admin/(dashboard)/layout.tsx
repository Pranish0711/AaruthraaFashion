import { AdminSidebar } from "@/components/admin/sidebar";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="border-b border-border bg-card px-6 py-4 md:px-8">
          <h1 className="text-sm font-medium text-muted-foreground">AaruthraaFashion Admin</h1>
        </div>
        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
