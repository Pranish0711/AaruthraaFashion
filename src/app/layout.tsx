import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Toaster } from "sonner";
import { SEO_KEYWORDS, SITE } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "AaruthraaFashion | Wholesale & Custom Apparel Erode, Tamil Nadu",
    template: "%s | AaruthraaFashion",
  },
  description:
    "Wholesale & custom apparel manufacturer in Erode, Tamil Nadu. Bulk t-shirts from ₹99, track pants, shorts & team wear. MOQ 100 pcs. Pan India delivery.",
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    title: "AaruthraaFashion | Wholesale Custom Apparel Erode",
    description: "Bulk custom t-shirts & sportswear from Erode, Tamil Nadu. MOQ 100 pcs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AaruthraaFashion | Wholesale Apparel Erode",
    description: "Custom bulk t-shirts, track pants & team apparel from Erode, TN.",
  },
  alternates: {
    canonical: SITE.url,
  },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": SITE.city,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${oswald.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
