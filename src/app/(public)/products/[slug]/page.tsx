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

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.shortDescription,
    keywords: [product.name, product.productType, "wholesale", "bulk apparel", "custom"],
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
              {primaryImage && (
                <Image src={primaryImage.url} alt={product.name} fill className="object-cover" priority sizes="50vw" />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.map((img) => (
                  <div key={img.id} className="relative aspect-square overflow-hidden bg-muted">
                    <Image src={img.url} alt="" fill className="object-cover" sizes="100px" />
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
              {product.customizationAvailable && <Badge variant="accent">Available For Customization</Badge>}
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
                <Link href={`/customize?product=${product.slug}`}>Customize This Product</Link>
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
          <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">Want This In Your Own Style?</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Customize the fabric, color, branding, logo, print and quantity based on your requirements.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild variant="accent" size="lg">
              <Link href={`/customize?product=${product.slug}`}>Customize This Product</Link>
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
