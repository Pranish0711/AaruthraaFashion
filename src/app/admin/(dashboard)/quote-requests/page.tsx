import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatDate } from "@/lib/utils";

export default async function QuoteRequestsPage() {
  const requests = await prisma.quoteRequest.findMany({
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold uppercase">Bulk Quote Requests</h1>
      <div className="overflow-x-auto border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Organization</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Quantity</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-4 py-3"><Link href={`/admin/quote-requests/${r.id}`} className="hover:underline">{r.customer.name}</Link></td>
                <td className="px-4 py-3">{r.customer.organization ?? "—"}</td>
                <td className="px-4 py-3">{r.productCategory}</td>
                <td className="px-4 py-3">{r.quantity}</td>
                <td className="px-4 py-3">{formatDate(r.createdAt)}</td>
                <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
