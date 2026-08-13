import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [
    totalProducts,
    activeProducts,
    totalCustomization,
    newCustomization,
    totalQuotes,
    newQuotes,
    recentCustomization,
    recentQuotes,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { active: true } }),
    prisma.customizationRequest.count(),
    prisma.customizationRequest.count({ where: { status: "NEW" } }),
    prisma.quoteRequest.count(),
    prisma.quoteRequest.count({ where: { status: "NEW" } }),
    prisma.customizationRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { customer: true, product: true },
    }),
    prisma.quoteRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { customer: true },
    }),
  ]);

  const recentRequests = [
    ...recentCustomization.map((r) => ({
      id: r.id,
      customer: r.customer.name,
      product: r.productName,
      quantity: r.quantityRange,
      type: "Customization",
      date: r.createdAt,
      status: r.status,
      href: `/admin/customization-requests/${r.id}`,
    })),
    ...recentQuotes.map((r) => ({
      id: r.id,
      customer: r.customer.name,
      product: r.productCategory,
      quantity: r.quantity,
      type: "Bulk Quote",
      date: r.createdAt,
      status: r.status,
      href: `/admin/quote-requests/${r.id}`,
    })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 8);

  const stats = [
    { label: "Total Products", value: totalProducts },
    { label: "Active Products", value: activeProducts },
    { label: "Customization Requests", value: totalCustomization },
    { label: "New Customization", value: newCustomization },
    { label: "Bulk Quote Requests", value: totalQuotes },
    { label: "New Quotes", value: newQuotes },
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-bold uppercase">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">{stat.value}</p></CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="mb-4 font-display text-xl font-bold uppercase">Recent Requests</h2>
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Customer</th>
                <th className="px-4 py-3 text-left font-semibold">Product</th>
                <th className="px-4 py-3 text-left font-semibold">Quantity</th>
                <th className="px-4 py-3 text-left font-semibold">Type</th>
                <th className="px-4 py-3 text-left font-semibold">Date</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((r) => (
                <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3"><Link href={r.href} className="hover:underline">{r.customer}</Link></td>
                  <td className="px-4 py-3">{r.product}</td>
                  <td className="px-4 py-3">{r.quantity}</td>
                  <td className="px-4 py-3">{r.type}</td>
                  <td className="px-4 py-3">{formatDate(r.date)}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
