import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/public/product-card";
import { SectionHeading } from "@/components/public/motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { SEO_KEYWORDS, SITE } from "@/lib/seo";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Wholesale Products — T-Shirts, Track Pants & Shorts",
  description: `Browse wholesale track pants, shorts and custom t-shirts from ${SITE.location}. Bulk customization from MOQ 100 pcs.`,
  keywords: [...SEO_KEYWORDS],
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: categorySlug } = await searchParams;

  const categories = await prisma.category.findMany({
    where: { parentId: null },
    orderBy: { displayOrder: "asc" },
  });

  const selectedCategory = categorySlug
    ? categories.find((c) => c.slug === categorySlug)
    : null;

  const products = await prisma.product.findMany({
    where: {
      active: true,
      ...(selectedCategory ? { categoryId: selectedCategory.id } : {}),
    },
    include: {
      category: true,
      images: { orderBy: { displayOrder: "asc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="section-padding">
      <div className="container-wide">
        <SectionHeading
          title="Product Catalogue"
          subtitle="Sample designs and reference products. All available for customization on bulk orders."
          align="left"
        />

        <div className="mb-10 flex flex-wrap gap-3">
          <Link
            href="/products"
            className={cn(
              "border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
              !categorySlug ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground",
            )}
          >
            All Products
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className={cn(
                "border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                categorySlug === cat.slug ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground",
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <p className="text-muted-foreground">No products found in this category.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
