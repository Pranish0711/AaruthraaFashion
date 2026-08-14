import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES } from "@/lib/site-images";

export function DesignCtaSection() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div className="container-wide grid min-h-[520px] lg:grid-cols-2">
        <div className="relative min-h-[280px] lg:min-h-full">
          <Image
            src={SITE_IMAGES.designStudio}
            alt="Custom apparel design and branding"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={80}
          />
          <div className="absolute inset-0 bg-foreground/30 lg:hidden" />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:py-20 animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Your Vision · Our Craft</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight md:text-5xl lg:text-6xl">
            Make Your Own Design.
          </h2>
          <p className="mt-2 font-display text-2xl font-bold uppercase text-neutral-300 md:text-3xl">
            We Bring It To Life.
          </p>
          <p className="mt-6 max-w-lg text-neutral-400">
            Upload your logo, share a reference, or describe your idea — our team helps you create fully custom
            t-shirts, track pants and team apparel for bulk orders from 100 pieces.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-neutral-300">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 bg-accent" />
              Custom colors, fabrics &amp; GSM
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 bg-accent" />
              Logo, print, embroidery &amp; DTF
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 bg-accent" />
              Based in Erode — delivering across India
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="accent" size="lg">
              <Link href="/customize">Start Your Custom Design</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground">
              <Link href="/bulk-quote">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
