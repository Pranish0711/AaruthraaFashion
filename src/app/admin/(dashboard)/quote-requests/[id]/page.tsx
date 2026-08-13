import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/admin/status-badge";
import { RequestStatusForm } from "@/components/admin/request-status-form";
import { formatDate } from "@/lib/utils";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { deleteQuoteRequestAction } from "@/actions/admin";
import { getSiteSettings } from "@/lib/db-helpers";

type Props = { params: Promise<{ id: string }> };

export default async function QuoteRequestDetailPage({ params }: Props) {
  const { id } = await params;
  const [request, settings] = await Promise.all([
    prisma.quoteRequest.findUnique({
      where: { id },
      include: { customer: true, files: true },
    }),
    getSiteSettings(),
  ]);

  if (!request) notFound();

  const whatsappUrl = buildWhatsAppUrl(
    settings.whatsappNumber,
    buildWhatsAppMessage({ customerName: request.customer.name, page: "admin-reply" }),
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold uppercase">Bulk Quote Request</h1>
        <StatusBadge status={request.status} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="space-y-4 border border-border p-6">
          <h2 className="font-display text-lg font-bold uppercase">Customer</h2>
          <dl className="space-y-2 text-sm">
            <div><dt className="font-semibold">Name</dt><dd>{request.customer.name}</dd></div>
            <div><dt className="font-semibold">Organization</dt><dd>{request.customer.organization ?? "—"}</dd></div>
            <div><dt className="font-semibold">Phone</dt><dd>{request.customer.phone}</dd></div>
            <div><dt className="font-semibold">Email</dt><dd>{request.customer.email}</dd></div>
          </dl>
          <Button asChild variant="accent"><Link href={whatsappUrl} target="_blank">Contact on WhatsApp</Link></Button>
        </section>

        <section className="space-y-4 border border-border p-6">
          <h2 className="font-display text-lg font-bold uppercase">Requirement</h2>
          <dl className="space-y-2 text-sm">
            <div><dt className="font-semibold">Category</dt><dd>{request.productCategory}</dd></div>
            <div><dt className="font-semibold">Type</dt><dd>{request.productType ?? "—"}</dd></div>
            <div><dt className="font-semibold">Quantity</dt><dd>{request.quantity}</dd></div>
            <div><dt className="font-semibold">Location</dt><dd>{request.deliveryLocation ?? "—"}</dd></div>
            <div><dt className="font-semibold">Delivery Date</dt><dd>{request.expectedDeliveryDate ? formatDate(request.expectedDeliveryDate) : "—"}</dd></div>
            <div><dt className="font-semibold">Submitted</dt><dd>{formatDate(request.createdAt)}</dd></div>
          </dl>
        </section>
      </div>

      {request.customizationRequirement && (
        <section className="border border-border p-6">
          <h2 className="font-display text-lg font-bold uppercase">Customization</h2>
          <p className="mt-2 text-sm">{request.customizationRequirement}</p>
        </section>
      )}

      {request.additionalNotes && (
        <section className="border border-border p-6">
          <h2 className="font-display text-lg font-bold uppercase">Notes</h2>
          <p className="mt-2 text-sm">{request.additionalNotes}</p>
        </section>
      )}

      {request.files.length > 0 && (
        <section className="border border-border p-6">
          <h2 className="font-display text-lg font-bold uppercase">Files</h2>
          <ul className="mt-3 space-y-2">
            {request.files.map((f) => (
              <li key={f.id}><Link href={f.url} target="_blank" className="underline">{f.filename}</Link></li>
            ))}
          </ul>
        </section>
      )}

      <RequestStatusForm type="quote" id={request.id} currentStatus={request.status} internalNotes={request.internalNotes ?? ""} />

      <form action={deleteQuoteRequestAction.bind(null, request.id)}>
        <Button type="submit" variant="destructive">Delete Request</Button>
      </form>
    </div>
  );
}
