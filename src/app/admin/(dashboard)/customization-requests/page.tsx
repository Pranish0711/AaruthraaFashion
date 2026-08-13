import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatDate } from "@/lib/utils";

export default async function CustomizationRequestsPage() {
  const requests = await prisma.customizationRequest.findMany({
    include: { customer: true, product: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold uppercase">Customization Requests</h1>
      <div className="overflow-x-auto border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Quantity</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-4 py-3">
                  <Link href={`/admin/customization-requests/${r.id}`} className="hover:underline">{r.customer.name}</Link>
                </td>
                <td className="px-4 py-3">{r.productName}</td>
                <td className="px-4 py-3">{r.quantityRange}</td>
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
