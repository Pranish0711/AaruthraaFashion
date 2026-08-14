/** Curated Unsplash images — free to use, no brand logos. */
export const SITE_IMAGES = {
  hero: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1920&q=80&auto=format&fit=crop",
  trackPants: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80&auto=format&fit=crop",
  shorts: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=900&q=80&auto=format&fit=crop",
  tShirts: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80&auto=format&fit=crop",
  designStudio: "https://images.unsplash.com/photo-1558171813-4c088754af81?w=1200&q=80&auto=format&fit=crop",
  corporate: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80&auto=format&fit=crop",
  sportswear: "https://images.unsplash.com/photo-1571019614242-c5c25dee113f?w=900&q=80&auto=format&fit=crop",
} as const;

export function isPlaceholderImage(url?: string | null) {
  return !url || url.includes("/images/placeholders/");
}

export function resolveCategoryImage(slug: string, dbUrl?: string | null) {
  if (dbUrl && !isPlaceholderImage(dbUrl)) return dbUrl;
  const map: Record<string, string> = {
    "track-pants": SITE_IMAGES.trackPants,
    shorts: SITE_IMAGES.shorts,
    "t-shirts": SITE_IMAGES.tShirts,
    sportswear: SITE_IMAGES.sportswear,
    "corporate-apparel": SITE_IMAGES.corporate,
    "college-event-apparel": SITE_IMAGES.tShirts,
  };
  return map[slug] ?? SITE_IMAGES.hero;
}
