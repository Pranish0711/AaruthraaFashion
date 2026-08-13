import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BulkQuoteForm } from "@/components/forms/bulk-quote-form";

export const metadata: Metadata = {
  title: "Bulk Quote",
  description: "Request a customized bulk apparel quotation. Wholesale track pants, shorts and custom t-shirts from MOQ 100.",
};

export default async function BulkQuotePage() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    orderBy: { displayOrder: "asc" },
    select: { name: true },
  });

  return (
    <div className="section-padding">
      <div className="container-wide max-w-4xl">
        <h1 className="font-display text-5xl font-bold uppercase md:text-6xl">Let&apos;s Create Your Apparel.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tell us what you need. Our team will prepare a customized quotation.
        </p>
        <div className="mt-12">
          <BulkQuoteForm categories={categories.map((c) => c.name)} />
        </div>
      </div>
    </div>
  );
}
