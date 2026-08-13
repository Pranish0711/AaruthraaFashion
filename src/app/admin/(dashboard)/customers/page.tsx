import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    include: {
      _count: {
        select: { customizationRequests: true, quoteRequests: true },
      },
      customizationRequests: { orderBy: { createdAt: "desc" }, take: 1 },
      quoteRequests: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold uppercase">Customers</h1>
      <div className="overflow-x-auto border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Organization</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Total Requests</th>
              <th className="px-4 py-3 text-left">Last Contact</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => {
              const lastCustom = c.customizationRequests[0]?.createdAt;
              const lastQuote = c.quoteRequests[0]?.createdAt;
              const lastContact = lastCustom && lastQuote
                ? lastCustom > lastQuote ? lastCustom : lastQuote
                : lastCustom ?? lastQuote ?? c.updatedAt;

              return (
                <tr key={c.id} className="border-t border-border">
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3">{c.organization ?? "—"}</td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c._count.customizationRequests + c._count.quoteRequests}</td>
                  <td className="px-4 py-3">{formatDate(lastContact)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
