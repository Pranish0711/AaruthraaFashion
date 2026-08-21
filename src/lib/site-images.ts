/** Curated Unsplash images — free to use, no brand logos. */
export const SITE_IMAGES = {
  hero: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1600&q=75&auto=format&fit=crop",
  trackPants: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=75&auto=format&fit=crop",
  shorts: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&q=75&auto=format&fit=crop",
  tShirts: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=75&auto=format&fit=crop",
  polo: "https://images.unsplash.com/photo-1581655353564-df743a059650?w=800&q=75&auto=format&fit=crop",
  designStudio: "https://images.unsplash.com/photo-1558171813-4c088754af81?w=1000&q=75&auto=format&fit=crop",
  corporate: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=75&auto=format&fit=crop",
  sportswear: "https://images.unsplash.com/photo-1571019614242-c5c25dee113f?w=800&q=75&auto=format&fit=crop",
  og: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=630&q=80&auto=format&fit=crop",
} as const;

const PRODUCT_IMAGE_MAP: Record<string, string> = {
  "performance-sports-track-pant": SITE_IMAGES.trackPants,
  "classic-cotton-track-pant": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=75&auto=format&fit=crop",
  "team-training-track-pant": "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=75&auto=format&fit=crop",
  "custom-side-stripe-track-pant": SITE_IMAGES.sportswear,
  "performance-sports-shorts": SITE_IMAGES.shorts,
  "cotton-comfort-shorts": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=75&auto=format&fit=crop",
  "team-training-shorts": SITE_IMAGES.shorts,
  "custom-athletic-shorts": SITE_IMAGES.sportswear,
  "classic-round-neck-t-shirt": SITE_IMAGES.tShirts,
  "premium-polo-t-shirt": SITE_IMAGES.polo,
  "performance-sports-t-shirt": SITE_IMAGES.sportswear,
  "custom-corporate-event-t-shirt": SITE_IMAGES.corporate,
};

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  "track-pants": SITE_IMAGES.trackPants,
  shorts: SITE_IMAGES.shorts,
  "t-shirts": SITE_IMAGES.tShirts,
  sportswear: SITE_IMAGES.sportswear,
  "corporate-apparel": SITE_IMAGES.corporate,
  "college-event-apparel": SITE_IMAGES.tShirts,
};

export function isPlaceholderImage(url?: string | null) {
  return !url || url.includes("/images/placeholders/");
}

export function resolveCategoryImage(slug: string, dbUrl?: string | null) {
  if (dbUrl && !isPlaceholderImage(dbUrl)) return dbUrl;
  return CATEGORY_IMAGE_MAP[slug] ?? SITE_IMAGES.hero;
}

export function resolveProductImage(
  slug: string,
  categorySlug?: string | null,
  dbUrl?: string | null,
) {
  if (dbUrl && !isPlaceholderImage(dbUrl)) return dbUrl;
  if (PRODUCT_IMAGE_MAP[slug]) return PRODUCT_IMAGE_MAP[slug];
  if (categorySlug && CATEGORY_IMAGE_MAP[categorySlug]) return CATEGORY_IMAGE_MAP[categorySlug];
  return SITE_IMAGES.tShirts;
}
