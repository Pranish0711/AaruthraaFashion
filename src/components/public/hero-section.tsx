import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES } from "@/lib/site-images";
import { FadeIn } from "@/components/public/motion";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-end overflow-hidden bg-foreground text-background">
      <Image
        src={SITE_IMAGES.hero}
        alt="Premium wholesale sportswear and custom apparel from Erode, Tamil Nadu"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={75}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-foreground/40" />
      <FadeIn immediate className="container-wide relative w-full section-padding">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Wholesale Apparel · Erode, Tamil Nadu
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.95] md:text-7xl lg:text-8xl">
          Your Team. Your Brand. Your Apparel.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-neutral-300">
          Premium wholesale apparel and custom clothing for businesses, colleges, sports teams and
          events — manufactured in Erode, delivered across India.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild variant="accent" size="lg" className="gap-2">
            <Link href="/customize">
              <Sparkles className="h-4 w-4" />
              Make Your Own Design
            </Link>
          </Button>
          <Button asChild variant="default" size="lg">
            <Link href="/bulk-quote">Get Bulk Quote</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-background text-background hover:bg-background hover:text-foreground"
          >
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
        <div className="mt-12 flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-wider text-neutral-400 md:gap-10">
          <span>MOQ From 100 Pcs</span>
          <span>Custom Printing</span>
          <span>Wholesale Pricing</span>
          <span>Erode, TN · Pan India</span>
        </div>
      </FadeIn>
    </section>
  );
}
