import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

function getStaticRoutes(baseUrl: string): MetadataRoute.Sitemap {
  return ["", "/products", "/customize", "/bulk-quote", "/solutions", "/about", "/contact"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const staticRoutes = getStaticRoutes(baseUrl);

  if (!process.env.DATABASE_URL) {
    return staticRoutes;
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const products = await prisma.product.findMany({
      where: { active: true },
      select: { slug: true, updatedAt: true },
    });

    const productRoutes = products.map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
