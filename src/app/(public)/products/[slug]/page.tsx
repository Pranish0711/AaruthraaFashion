import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { ProductMobileBar } from "@/components/public/product-mobile-bar";
import { buildWhatsAppMessage, buildWhatsAppUrl, getWhatsAppNumber } from "@/lib/whatsapp";
import { resolveProductImage } from "@/lib/site-images";
import { SITE } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, images: { orderBy: { displayOrder: "asc" }, take: 1 } },
  });
  if (!product) return { title: "Product Not Found" };

  const imageUrl = resolveProductImage(product.slug, product.category.slug, product.images[0]?.url);
  const title = `${product.name} — Wholesale ${product.productType} Erode`;
  const description = `${product.shortDescription} Bulk orders from MOQ ${product.moq}. Custom apparel from Erode, Tamil Nadu.`;
  const url = `${SITE.url}/products/${product.slug}`;

  return {
    title,
    description,
    keywords: [product.name, product.productType, "wholesale Erode", "bulk apparel", "custom", "Tamil Nadu"],
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "en_IN",
      siteName: SITE.name,
      images: [{ url: imageUrl, width: 800, height: 1000, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: { canonical: url },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug, active: true },
    include: {
      category: true,
      images: { orderBy: { displayOrder: "asc" } },
    },
  });

  if (!product) notFound();

  const fabrics = product.fabrics as string[];
  const gsmOptions = product.gsmOptions as string[];
  const colors = product.colors as string[];
  const sizes = product.sizes as string[];
  const customizationOptions = product.customizationOptions as string[];
  const primaryImage = product.images.find((i) => i.isPrimary) ?? product.images[0];
  const primaryImageUrl = resolveProductImage(product.slug, product.category.slug, primaryImage?.url);
  const whatsappUrl = buildWhatsAppUrl(
    getWhatsAppNumber(),
    buildWhatsAppMessage({ productName: product.name, customizationInterest: true, page: "product" }),
  );

  return (
    <>
      <div className="section-padding pb-24 md:pb-16">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src={primaryImageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="50vw"
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.map((img) => (
                  <div key={img.id} className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={resolveProductImage(product.slug, product.category.slug, img.url)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{product.category.name}</p>
            <h1 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">{product.name}</h1>
            <p className="mt-4 text-muted-foreground">{product.shortDescription}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {product.customizationAvailable && <Badge variant="accent">Make Your Own Design</Badge>}
              <Badge variant="secondary">MOQ {product.moq}</Badge>
              {product.startingPrice && <Badge variant="secondary">From {formatPrice(product.startingPrice)}</Badge>}
            </div>

            <div className="mt-8 space-y-6 text-sm">
              <div>
                <h3 className="font-display text-sm font-bold uppercase">Description</h3>
                <p className="mt-2 text-muted-foreground">{product.fullDescription}</p>
              </div>
              {fabrics.length > 0 && (
                <div>
                  <h3 className="font-display text-sm font-bold uppercase">Available Fabrics</h3>
                  <p className="mt-2 text-muted-foreground">{fabrics.join(", ")}</p>
                </div>
              )}
              {gsmOptions.length > 0 && (
                <div>
                  <h3 className="font-display text-sm font-bold uppercase">GSM Options</h3>
                  <p className="mt-2 text-muted-foreground">{gsmOptions.join(", ")}</p>
                </div>
              )}
              {colors.length > 0 && (
                <div>
                  <h3 className="font-display text-sm font-bold uppercase">Available Colors</h3>
                  <p className="mt-2 text-muted-foreground">{colors.join(", ")}</p>
                </div>
              )}
              {sizes.length > 0 && (
                <div>
                  <h3 className="font-display text-sm font-bold uppercase">Available Sizes</h3>
                  <p className="mt-2 text-muted-foreground">{sizes.join(", ")}</p>
                </div>
              )}
              {customizationOptions.length > 0 && (
                <div>
                  <h3 className="font-display text-sm font-bold uppercase">Customization Options</h3>
                  <p className="mt-2 text-muted-foreground">{customizationOptions.join(", ")}</p>
                </div>
              )}
            </div>

            <div className="mt-10 hidden flex-wrap gap-4 md:flex">
              <Button asChild variant="accent" size="lg">
                <Link href={`/customize?product=${product.slug}`}>Make Your Own Design</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/bulk-quote">Get Bulk Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
              </Button>
            </div>
          </div>
        </div>

        <section className="container-wide mt-20 border border-border bg-muted/20 p-8 md:p-12">
          <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">Make Your Own Design</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Customize the fabric, color, branding, logo, print and quantity based on your requirements.
            Our Erode team will help bring your design to life.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild variant="accent" size="lg">
              <Link href={`/customize?product=${product.slug}`}>Start Custom Design</Link>
            </Button>
            <Button asChild variant="default" size="lg">
              <Link href="/bulk-quote">Get Bulk Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </Button>
          </div>
        </section>
      </div>

      <ProductMobileBar productSlug={product.slug} productName={product.name} whatsappUrl={whatsappUrl} />
    </>
  );
}
