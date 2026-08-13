import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/db-helpers";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/public/category-card";
import { ProductCard } from "@/components/public/product-card";
import { FadeIn, SectionHeading } from "@/components/public/motion";
import { FAQAccordion } from "@/components/public/faq-accordion";

export default async function HomePage() {
  const [settings, featuredProducts, categories] = await Promise.all([
    getSiteSettings(),
    prisma.product.findMany({
      where: { featured: true, active: true },
      include: { category: true, images: { orderBy: { displayOrder: "asc" }, take: 1 } },
      take: 4,
    }),
    prisma.category.findMany({
      where: { parentId: null },
      orderBy: { displayOrder: "asc" },
      take: 3,
    }),
  ]);

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
      answer: "Yes. Customers can share their requirements, logos or reference images and request a custom product.",
    },
    {
      question: "Do you provide samples?",
      answer: settings.faqSamplesAnswer,
    },
    {
      question: "Do you deliver across India?",
      answer: "Yes, Pan India delivery is available subject to location and order requirements.",
    },
    {
      question: "How do I get pricing?",
      answer: "Submit your requirement through the Bulk Quote form or contact us through WhatsApp.",
    },
  ];

  const whyUs = [
    "Wholesale pricing",
    "MOQ from 100 pieces",
    "Custom printing",
    "Multiple fabric options",
    "Corporate and institutional orders",
    "Custom branding",
    "Flexible bulk quantities",
    "Professional design support",
    "Pan India delivery",
    "Dedicated order assistance",
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
      <section className="relative flex min-h-[90vh] items-end bg-foreground text-background">
        <div className="absolute inset-0 bg-[url('/images/placeholders/track-pants.svg')] bg-cover bg-center opacity-20" />
        <div className="container-wide relative section-padding w-full">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Wholesale Apparel</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.95] md:text-7xl lg:text-8xl">
              Your Team. Your Brand. Your Apparel.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-neutral-300">
              Premium wholesale apparel and custom clothing for businesses, colleges, sports teams, events and organizations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild variant="accent" size="lg">
                <Link href="/bulk-quote">Get Bulk Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground">
                <Link href="/products">Explore Products</Link>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-wider text-neutral-400 md:gap-10">
              <span>MOQ From 100 Pcs</span>
              <span>Custom Printing</span>
              <span>Wholesale Pricing</span>
              <span>Pan India Delivery</span>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide grid gap-6 lg:grid-cols-3">
          <CategoryCard
            title="Track Pants"
            headline="Built For Movement. Made For Bulk."
            description="Sportswear, cotton homewear and fully customizable track pants for teams and organizations."
            href="/products?category=track-pants"
            buttonText="Explore Track Pants"
            imageUrl={categories.find((c) => c.slug === "track-pants")?.imageUrl}
          />
          <CategoryCard
            title="Shorts"
            headline="Comfort. Performance. Customized."
            description="Wholesale sports and cotton shorts for teams, events and organizations."
            href="/products?category=shorts"
            buttonText="Explore Shorts"
            imageUrl={categories.find((c) => c.slug === "shorts")?.imageUrl}
          />
          <CategoryCard
            title="Custom T-Shirts"
            headline="Your Brand. Your Design."
            description="Corporate, college, sports and event t-shirts with full customization."
            href="/customize"
            buttonText="Customize Your Order"
            imageUrl={categories.find((c) => c.slug === "t-shirts")?.imageUrl}
            priceTag="Starting From ₹99*"
            moqTag="MOQ From 100 Pieces"
          />
        </div>
      </section>

      <section className="bg-foreground py-20 text-background md:py-28">
        <div className="container-wide px-4 text-center md:px-8">
          <h2 className="font-display text-5xl font-bold uppercase md:text-7xl lg:text-8xl">Custom T-Shirts</h2>
          <p className="font-display text-4xl font-bold uppercase text-accent md:text-6xl">Starting From ₹99*</p>
          <p className="mx-auto mt-6 max-w-2xl text-neutral-300">
            Designed for companies, colleges, sports teams, events and large group orders.
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
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <SectionHeading title="Why AaruthraaFashion" />
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
