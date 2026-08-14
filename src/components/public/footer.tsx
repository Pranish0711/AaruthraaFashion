import Link from "next/link";
import { getCachedSiteSettings } from "@/lib/data";
import { SITE } from "@/lib/seo";

export async function Footer() {
  const settings = await getCachedSiteSettings();

  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="container-wide section-padding grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl font-bold uppercase tracking-wider">AaruthraaFashion</h3>
          <p className="mt-4 text-sm text-neutral-400">
            Premium wholesale apparel and custom clothing from {SITE.location}. Serving businesses, colleges, sports teams and organizations across India.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-neutral-400">
            <li><Link href="/products" className="hover:text-background">Products</Link></li>
            <li><Link href="/customize" className="hover:text-background">Custom Orders</Link></li>
            <li><Link href="/bulk-quote" className="hover:text-background">Bulk Quote</Link></li>
            <li><Link href="/solutions" className="hover:text-background">Solutions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-neutral-400">
            <li>{settings.businessEmail}</li>
            {settings.contactNumber && <li>{settings.contactNumber}</li>}
            {settings.address && <li>{settings.address}</li>}
            {settings.businessHours && <li>{settings.businessHours}</li>}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider">Wholesale</h4>
          <ul className="mt-4 space-y-2 text-sm text-neutral-400">
            <li>MOQ from 100 pcs</li>
            <li>Custom T-Shirts from ₹99*</li>
            <li>Pan India Delivery</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-800 py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} {settings.businessName}. All rights reserved.
      </div>
    </footer>
  );
}
