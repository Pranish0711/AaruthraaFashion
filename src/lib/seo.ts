export const SITE = {
  name: "AaruthraaFashion",
  tagline: "Wholesale & Custom Apparel Manufacturer",
  city: "Erode",
  state: "Tamil Nadu",
  country: "India",
  location: "Erode, Tamil Nadu, India",
  region: "Erode & Tamil Nadu",
  email: "info@aaruthraafashion.in",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aaruthraafashion.in",
  /** Erode city centre — used for local SEO */
  geo: {
    latitude: 11.341,
    longitude: 77.7172,
  },
} as const;

/** Avoid circular import — OG image URL defined inline */
const SITE_IMAGES_OG =
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=630&q=80&auto=format&fit=crop";


export const OG_IMAGE = {
  url: SITE_IMAGES_OG,
  width: 1200,
  height: 630,
  alt: "AaruthraaFashion — Wholesale & Custom Apparel in Erode, Tamil Nadu",
} as const;


export const SEO_KEYWORDS = [
  "wholesale t-shirts Erode",
  "custom t-shirts Erode Tamil Nadu",
  "t-shirt manufacturer Erode",
  "bulk apparel Erode",
  "wholesale clothing Erode",
  "custom sportswear Erode",
  "corporate t-shirts Erode",
  "college event t-shirts Tamil Nadu",
  "bulk track pants Erode",
  "custom printed t-shirts Erode",
  "MOQ 100 t-shirts",
  "make your own design t-shirts",
  "custom team apparel India",
  "wholesale apparel manufacturer Tamil Nadu",
  "Pan India apparel delivery",
] as const;

export function buildLocalBusinessJsonLd(settings: {
  businessName: string;
  businessEmail: string;
  contactNumber?: string | null;
  address?: string | null;
  whatsappNumber: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: settings.businessName,
    description:
      "Wholesale and custom apparel manufacturer in Erode, Tamil Nadu. Bulk t-shirts, track pants, shorts and corporate uniforms from MOQ 100. Make your own design.",
    url: SITE.url,
    email: settings.businessEmail,
    telephone: settings.contactNumber ?? undefined,
    image: OG_IMAGE.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.state,
      addressCountry: "IN",
      streetAddress: settings.address ?? SITE.location,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Erode" },
      { "@type": "State", name: "Tamil Nadu" },
      { "@type": "Country", name: "India" },
    ],
    priceRange: "₹₹",
    knowsAbout: [
      "Wholesale Apparel",
      "Custom T-Shirts",
      "Make Your Own Design",
      "Bulk Orders",
      "Corporate Uniforms",
      "Sports Team Apparel",
    ],
  };
}

export function buildPageMetadata(base: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}) {
  const url = base.path ? `${SITE.url}${base.path}` : SITE.url;
  return {
    title: base.title,
    description: base.description,
    keywords: base.keywords ?? [...SEO_KEYWORDS],
    openGraph: {
      title: base.title,
      description: base.description,
      url,
      locale: "en_IN" as const,
      type: "website" as const,
      siteName: SITE.name,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: base.title,
      description: base.description,
      images: [OG_IMAGE.url],
    },
    alternates: {
      canonical: url,
    },
    other: {
      "geo.region": "IN-TN",
      "geo.placename": SITE.city,
      "geo.position": `${SITE.geo.latitude};${SITE.geo.longitude}`,
      ICBM: `${SITE.geo.latitude}, ${SITE.geo.longitude}`,
    },
  };
}
