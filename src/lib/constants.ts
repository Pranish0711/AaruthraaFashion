export const QUANTITY_RANGES = [
  "100–250",
  "250–500",
  "500–1000",
  "1000–5000",
  "5000+",
] as const;

export const REQUEST_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUOTATION_SENT",
  "DESIGN_DISCUSSION",
  "CONFIRMED",
  "PRODUCTION",
  "COMPLETED",
  "CANCELLED",
] as const;

export const STATUS_LABELS: Record<string, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUOTATION_SENT: "Quotation Sent",
  DESIGN_DISCUSSION: "Design Discussion",
  CONFIRMED: "Confirmed",
  PRODUCTION: "Production",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/customize", label: "Custom Orders" },
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/products", label: "Products", icon: "Package" },
  { href: "/admin/categories", label: "Categories", icon: "FolderTree" },
  { href: "/admin/customization-requests", label: "Customization Requests", icon: "Palette" },
  { href: "/admin/quote-requests", label: "Bulk Quote Requests", icon: "FileText" },
  { href: "/admin/customers", label: "Customers", icon: "Users" },
  { href: "/admin/media", label: "Media", icon: "Image" },
  { href: "/admin/settings", label: "Settings", icon: "Settings" },
] as const;
