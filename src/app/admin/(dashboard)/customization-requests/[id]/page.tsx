import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/admin/status-badge";
import { RequestStatusForm } from "@/components/admin/request-status-form";
import { formatDate } from "@/lib/utils";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/db-helpers";

type Props = { params: Promise<{ id: string }> };

export default async function CustomizationRequestDetailPage({ params }: Props) {
  const { id } = await params;
  const [request, settings] = await Promise.all([
    prisma.customizationRequest.findUnique({
      where: { id },
      include: { customer: true, product: true, files: true },
    }),
    getSiteSettings(),
  ]);

  if (!request) notFound();

  const whatsappUrl = buildWhatsAppUrl(
    settings.whatsappNumber,
    buildWhatsAppMessage({ customerName: request.customer.name, page: "admin-reply" }),
  );

  const flags = [
    ["Logo", request.logoRequired],
    ["Front Printing", request.frontPrinting],
    ["Back Printing", request.backPrinting],
    ["Sleeve Printing", request.sleevePrinting],
    ["Embroidery", request.embroidery],
    ["DTF Printing", request.dtfPrinting],
    ["Screen Printing", request.screenPrinting],
    ["Player Name", request.playerName],
    ["Player Number", request.playerNumber],
  ].filter(([, v]) => v);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold uppercase">Customization Request</h1>
        <StatusBadge status={request.status} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="space-y-4 border border-border p-6">
          <h2 className="font-display text-lg font-bold uppercase">Customer Details</h2>
          <dl className="space-y-2 text-sm">
            <div><dt className="font-semibold">Name</dt><dd>{request.customer.name}</dd></div>
            <div><dt className="font-semibold">Organization</dt><dd>{request.customer.organization ?? "—"}</dd></div>
            <div><dt className="font-semibold">Phone</dt><dd>{request.customer.phone}</dd></div>
            <div><dt className="font-semibold">Email</dt><dd>{request.customer.email}</dd></div>
            <div><dt className="font-semibold">Location</dt><dd>{[request.customer.city, request.customer.state].filter(Boolean).join(", ") || "—"}</dd></div>
          </dl>
          <Button asChild variant="accent"><Link href={whatsappUrl} target="_blank">Contact on WhatsApp</Link></Button>
        </section>

        <section className="space-y-4 border border-border p-6">
          <h2 className="font-display text-lg font-bold uppercase">Product Details</h2>
          <dl className="space-y-2 text-sm">
            <div><dt className="font-semibold">Product</dt><dd>{request.productName}</dd></div>
            <div><dt className="font-semibold">Quantity</dt><dd>{request.quantityRange}</dd></div>
            <div><dt className="font-semibold">Fabric</dt><dd>{request.fabricPreference ?? "—"}</dd></div>
            <div><dt className="font-semibold">GSM</dt><dd>{request.gsmPreference ?? "—"}</dd></div>
            <div><dt className="font-semibold">Color</dt><dd>{request.colorPreference ?? "—"}</dd></div>
            <div><dt className="font-semibold">Sizes</dt><dd>{request.sizeRange ?? "—"}</dd></div>
            <div><dt className="font-semibold">Delivery Date</dt><dd>{request.expectedDeliveryDate ? formatDate(request.expectedDeliveryDate) : "—"}</dd></div>
          </dl>
        </section>
      </div>

      {flags.length > 0 && (
        <section className="border border-border p-6">
          <h2 className="font-display text-lg font-bold uppercase">Customization</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {flags.map(([label]) => (
              <li key={String(label)} className="bg-muted px-3 py-1 text-xs font-semibold uppercase">{label}</li>
            ))}
          </ul>
        </section>
      )}

      {request.additionalRequirements && (
        <section className="border border-border p-6">
          <h2 className="font-display text-lg font-bold uppercase">Additional Requirements</h2>
          <p className="mt-2 text-sm text-muted-foreground">{request.additionalRequirements}</p>
        </section>
      )}

      {request.files.length > 0 && (
        <section className="border border-border p-6">
          <h2 className="font-display text-lg font-bold uppercase">Uploaded Files</h2>
          <ul className="mt-3 space-y-2">
            {request.files.map((f) => (
              <li key={f.id}><Link href={f.url} target="_blank" className="text-sm underline">{f.filename}</Link></li>
            ))}
          </ul>
        </section>
      )}

      <RequestStatusForm type="customization" id={request.id} currentStatus={request.status} internalNotes={request.internalNotes ?? ""} />
    </div>
  );
}
