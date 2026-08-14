import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE, SEO_KEYWORDS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us — Wholesale Apparel Manufacturer Erode",
  description:
    "AaruthraaFashion is a wholesale and custom apparel manufacturer based in Erode, Tamil Nadu. Bulk t-shirts, track pants and team wear from MOQ 100.",
  keywords: [...SEO_KEYWORDS],
};

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-wide max-w-3xl">
        <h1 className="font-display text-5xl font-bold uppercase md:text-6xl">About AaruthraaFashion</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          AaruthraaFashion is a wholesale and custom apparel supplier based in {SITE.location}, serving corporate
          companies, MNCs, startups, schools, colleges, sports teams, event organizers and organizations across India.
        </p>
        <p className="mt-4 text-muted-foreground">
          Our primary business is bulk apparel with full customization — from fabric and GSM selection to logo printing,
          embroidery, DTF and screen printing. Make your own design and we manufacture it at scale. Every product in
          our catalogue is a sample that can be customized to match your brand.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {["Wholesale Apparel", "Bulk Orders", "Make Your Own Design", "MOQ From 100 Pcs", `Based in ${SITE.city}`, "Pan India Delivery"].map((item) => (
            <div key={item} className="border border-border p-4 font-display text-sm font-bold uppercase tracking-wide">
              {item}
            </div>
          ))}
        </div>
        <Button asChild variant="accent" size="lg" className="mt-10">
          <Link href="/bulk-quote">Get Bulk Quote</Link>
        </Button>
      </div>
    </div>
  );
}
