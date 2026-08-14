import type { Metadata } from "next";
import Link from "next/link";
import { getCachedFeaturedProducts, getCachedSiteSettings, getCachedTopCategories } from "@/lib/data";
import { resolveCategoryImage, SITE_IMAGES, isPlaceholderImage } from "@/lib/site-images";
import { SEO_KEYWORDS, SITE } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/public/category-card";
import { ProductCard } from "@/components/public/product-card";
import { HeroSection } from "@/components/public/hero-section";
import { DesignCtaSection } from "@/components/public/design-cta";
import { SectionHeading } from "@/components/public/motion";
import { FAQAccordion } from "@/components/public/faq-accordion";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Wholesale & Custom Apparel Manufacturer in Erode, Tamil Nadu",
  description:
    "AaruthraaFashion — wholesale t-shirts, track pants & custom sportswear from Erode, Tamil Nadu. Bulk orders from MOQ 100 pcs. Custom printing from ₹99. Pan India delivery.",
  keywords: [...SEO_KEYWORDS],
  openGraph: {
    title: "AaruthraaFashion | Wholesale Custom Apparel Erode",
    description: "Bulk custom t-shirts, track pants & team apparel from Erode, Tamil Nadu. MOQ 100 pcs.",
    locale: "en_IN",
    type: "website",
    siteName: SITE.name,
  },
  alternates: {
    canonical: SITE.url,
  },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Erode",
  },
};

export default async function HomePage() {
  let settings;
  let featuredProducts: Awaited<ReturnType<typeof getCachedFeaturedProducts>> = [];
  let categories: Awaited<ReturnType<typeof getCachedTopCategories>> = [];

  try {
    [settings, featuredProducts, categories] = await Promise.all([
      getCachedSiteSettings(),
      getCachedFeaturedProducts(),
      getCachedTopCategories(),
    ]);
  } catch (error) {
    console.error("Failed to load homepage data:", error);
    settings = {
      faqSamplesAnswer:
        "Yes, sample units can be arranged for bulk orders subject to product type and customization requirements.",
    };
  }

  const faqItems = [
    {
      question: "What is the minimum order quantity?",
      answer: "Minimum order quantity generally starts from 100 pieces depending on the product and customization.",
    },
    {
      question: "Can I customize the sample products?",
      answer: "Yes. Sample products can be customized based on your requirements including colors, fabric, logo, printing and branding.",
    },
    {
      question: "Can you create a completely new design?",
      answer: "Yes. Share your logo, reference images or describe your idea — we help you make your own design for bulk production.",
    },
    {
      question: "Do you provide samples?",
      answer: settings?.faqSamplesAnswer ?? "Contact us for sample options on bulk orders.",
    },
    {
      question: "Do you deliver across India?",
      answer: "Yes. We are based in Erode, Tamil Nadu and deliver Pan India subject to order requirements.",
    },
    {
      question: "How do I get pricing?",
      answer: "Submit your requirement through the Bulk Quote form or contact us through WhatsApp.",
    },
  ];

  const whyUs = [
    "Wholesale pricing",
    "MOQ from 100 pieces",
    "Make your own design",
    "Multiple fabric options",
    "Corporate & institutional orders",
    "Custom branding",
    "Flexible bulk quantities",
    "Professional design support",
    "Pan India delivery",
    "Based in Erode, TN",
  ];

  const steps = [
    { num: "01", title: "Share Your Requirement", desc: "Select a product and tell us your quantity." },
    { num: "02", title: "Customize Your Design", desc: "Choose colors, fabric, printing and branding." },
    { num: "03", title: "Get a Quote", desc: "Receive pricing based on your requirements." },
    { num: "04", title: "Approve the Design", desc: "Review and approve the final design." },
    { num: "05", title: "Production & Delivery", desc: "We manufacture and deliver your order." },
  ];

  return (
    <>
      <HeroSection />

      <section className="section-padding">
        <div className="container-wide grid gap-6 lg:grid-cols-3">
          <CategoryCard
            title="Track Pants"
            headline="Built For Movement. Made For Bulk."
            description="Sportswear, cotton homewear and fully customizable track pants for teams and organizations."
            href="/products?category=track-pants"
            buttonText="Explore Track Pants"
            imageUrl={resolveCategoryImage("track-pants", categories.find((c) => c.slug === "track-pants")?.imageUrl)}
            priority
          />
          <CategoryCard
            title="Shorts"
            headline="Comfort. Performance. Customized."
            description="Wholesale sports and cotton shorts for teams, events and organizations."
            href="/products?category=shorts"
            buttonText="Explore Shorts"
            imageUrl={resolveCategoryImage("shorts", categories.find((c) => c.slug === "shorts")?.imageUrl)}
          />
          <CategoryCard
            title="Custom T-Shirts"
            headline="Your Brand. Your Design."
            description="Corporate, college, sports and event t-shirts with full customization."
            href="/customize"
            buttonText="Customize Your Order"
            imageUrl={resolveCategoryImage("t-shirts", categories.find((c) => c.slug === "t-shirts")?.imageUrl)}
            priceTag="Starting From ₹99*"
            moqTag="MOQ From 100 Pieces"
          />
        </div>
      </section>

      <DesignCtaSection />

      <section className="bg-foreground py-20 text-background md:py-28">
        <div className="container-wide px-4 text-center md:px-8 animate-fade-up">
          <h2 className="font-display text-5xl font-bold uppercase md:text-7xl lg:text-8xl">Custom T-Shirts</h2>
          <p className="font-display text-4xl font-bold uppercase text-accent md:text-6xl">Starting From ₹99*</p>
          <p className="mx-auto mt-6 max-w-2xl text-neutral-300">
            Designed for companies, colleges, sports teams, events and large group orders from Erode to anywhere in India.
          </p>
          <Button asChild variant="accent" size="lg" className="mt-8">
            <Link href="/bulk-quote">Request Custom Quote</Link>
          </Button>
          <p className="mt-6 text-xs text-neutral-500">
            *Final pricing depends on quantity, fabric, GSM, printing and customization.
          </p>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeading title="Featured Products" subtitle="Sample designs available for full customization." />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    images: product.images.map((img) => ({
                      ...img,
                      url: isPlaceholderImage(img.url) ? SITE_IMAGES.tShirts : img.url,
                    })),
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <SectionHeading title="Why AaruthraaFashion" subtitle={`Trusted wholesale apparel partner in ${SITE.location}.`} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {whyUs.map((item) => (
              <div key={item} className="border border-border bg-card p-5">
                <p className="font-display text-sm font-bold uppercase tracking-wide">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading title="How It Works" />
          <div className="grid gap-8 md:grid-cols-5">
            {steps.map((step) => (
              <div key={step.num}>
                <span className="font-display text-4xl font-bold text-accent">{step.num}</span>
                <h3 className="mt-4 font-display text-lg font-bold uppercase">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-wide max-w-3xl">
          <SectionHeading title="FAQ" />
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </>
  );
}
