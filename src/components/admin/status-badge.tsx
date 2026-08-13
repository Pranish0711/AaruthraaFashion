import { STATUS_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-yellow-100 text-yellow-800",
  QUOTATION_SENT: "bg-purple-100 text-purple-800",
  DESIGN_DISCUSSION: "bg-orange-100 text-orange-800",
  CONFIRMED: "bg-green-100 text-green-800",
  PRODUCTION: "bg-indigo-100 text-indigo-800",
  COMPLETED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex px-2 py-1 text-xs font-semibold uppercase", statusColors[status] ?? "bg-muted")}>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
