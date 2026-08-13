import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/db-helpers";
import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact AaruthraaFashion for wholesale and custom apparel enquiries.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const whatsappUrl = buildWhatsAppUrl(settings.whatsappNumber, buildWhatsAppMessage());

  return (
    <div className="section-padding">
      <div className="container-wide grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-5xl font-bold uppercase">Contact Us</h1>
          <p className="mt-4 text-muted-foreground">Get in touch for wholesale apparel and custom bulk orders.</p>
          <div className="mt-8 space-y-4 text-sm">
            <p><strong>Email:</strong> {settings.businessEmail}</p>
            {settings.contactNumber && <p><strong>Phone:</strong> {settings.contactNumber}</p>}
            {settings.address && <p><strong>Address:</strong> {settings.address}</p>}
            {settings.businessHours && <p><strong>Hours:</strong> {settings.businessHours}</p>}
          </div>
          <Button asChild variant="accent" size="lg" className="mt-8">
            <Link href={whatsappUrl} target="_blank">Chat on WhatsApp</Link>
          </Button>
        </div>
        <div className="border border-border bg-card p-8">
          <h2 className="font-display text-xl font-bold uppercase">Send a Message</h2>
          <div className="mt-6"><ContactForm /></div>
        </div>
      </div>
    </div>
  );
}
