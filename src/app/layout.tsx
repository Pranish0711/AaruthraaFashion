import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "AaruthraaFashion | Wholesale & Custom Apparel",
    template: "%s | AaruthraaFashion",
  },
  description:
    "Premium wholesale apparel and custom clothing for businesses, colleges, sports teams, events and organizations. MOQ from 100 pcs. Pan India delivery.",
  keywords: [
    "Wholesale T-Shirts",
    "Custom T-Shirts India",
    "Bulk Track Pants",
    "Corporate T-Shirts",
    "College Event T-Shirts",
    "Custom Sportswear",
    "Wholesale Sportswear",
    "Bulk Apparel India",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
