import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getCachedSiteSettings = unstable_cache(
  async () => {
    let settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });
    if (!settings) {
      settings = await prisma.siteSettings.create({ data: { id: "default" } });
    }
    return settings;
  },
  ["site-settings"],
  { revalidate: 300, tags: ["site-settings"] },
);

export const getCachedFeaturedProducts = unstable_cache(
  async () =>
    prisma.product.findMany({
      where: { featured: true, active: true },
      include: { category: true, images: { orderBy: { displayOrder: "asc" }, take: 1 } },
      take: 4,
    }),
  ["featured-products"],
  { revalidate: 120, tags: ["products"] },
);

export const getCachedTopCategories = unstable_cache(
  async () =>
    prisma.category.findMany({
      where: { parentId: null },
      orderBy: { displayOrder: "asc" },
      take: 6,
    }),
  ["top-categories"],
  { revalidate: 300, tags: ["categories"] },
);
