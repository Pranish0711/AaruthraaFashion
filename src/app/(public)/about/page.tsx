import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "AaruthraaFashion — premium wholesale and custom apparel manufacturer for bulk orders across India.",
};

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-wide max-w-3xl">
        <h1 className="font-display text-5xl font-bold uppercase md:text-6xl">About AaruthraaFashion</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          AaruthraaFashion is a wholesale and custom apparel supplier serving corporate companies, MNCs, startups,
          schools, colleges, sports teams, event organizers, factories, retailers and organizations across India.
        </p>
        <p className="mt-4 text-muted-foreground">
          Our primary business is bulk apparel with full customization — from fabric and GSM selection to logo printing,
          embroidery, DTF and screen printing. We are not a traditional retail store. Every product in our catalogue
          is a sample design that can be customized to match your brand.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {["Wholesale Apparel", "Bulk Orders", "Custom Apparel", "MOQ From 100 Pcs", "Pan India Delivery"].map((item) => (
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
