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
} as const;

export const SEO_KEYWORDS = [
  "wholesale t-shirts Erode",
  "custom t-shirts Tamil Nadu",
  "bulk track pants India",
  "corporate t-shirts Erode",
  "college event t-shirts",
  "custom sportswear wholesale",
  "bulk apparel Erode",
  "t-shirt manufacturer Tamil Nadu",
  "wholesale clothing Erode",
  "custom printed t-shirts",
  "MOQ 100 t-shirts",
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
      "Wholesale and custom apparel manufacturer in Erode, Tamil Nadu. Bulk t-shirts, track pants, shorts and corporate uniforms from MOQ 100.",
    url: SITE.url,
    email: settings.businessEmail,
    telephone: settings.contactNumber ?? undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.state,
      addressCountry: "IN",
      streetAddress: settings.address ?? SITE.location,
    },
    areaServed: ["Erode", "Tamil Nadu", "India"],
    priceRange: "₹₹",
    knowsAbout: [
      "Wholesale Apparel",
      "Custom T-Shirts",
      "Bulk Orders",
      "Corporate Uniforms",
      "Sports Team Apparel",
    ],
  };
}
