import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { CustomizationForm } from "@/components/forms/customization-form";
import { SectionHeading } from "@/components/public/motion";

export const metadata: Metadata = {
  title: "Custom Orders",
  description: "Request custom wholesale apparel. Customize fabric, colors, branding and printing. MOQ from 100 pieces.",
};

export default async function CustomizePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: productSlug } = await searchParams;
  const products = await prisma.product.findMany({
    where: { active: true },
    select: { id: true, name: true, slug: true },
    orderBy: { name: "asc" },
  });

  const preselected = productSlug
    ? products.find((p) => p.slug === productSlug) ?? null
    : null;

  return (
    <div className="section-padding">
      <div className="container-wide">
        <SectionHeading
          title="Customize Your Order"
          subtitle="Tell us your requirements and we'll prepare a custom quotation."
          align="left"
        />
        <Suspense>
          <CustomizationForm products={products} preselected={preselected} />
        </Suspense>
      </div>
    </div>
  );
}
