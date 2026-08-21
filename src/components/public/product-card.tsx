import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { resolveProductImage } from "@/lib/site-images";
import { buildPageMetadata, SITE } from "@/lib/seo";

type ProductCardProps = {
  product: {
    slug: string;
    name: string;
    shortDescription?: string;
    productType: string;
    moq: number;
    startingPrice?: number | null;
    customizationAvailable: boolean;
    category?: { name: string; slug?: string };
    images?: { url: string }[];
  };
};

export function ProductCard({ product }: ProductCardProps) {
  const rawUrl = product.images?.[0]?.url;
  const imageUrl = resolveProductImage(product.slug, product.category?.slug, rawUrl);

  return (
    <article className="group flex flex-col border border-border bg-card transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        {product.customizationAvailable && (
          <Badge variant="accent" className="absolute left-3 top-3">
            Customizable
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {product.category?.name ?? product.productType}
        </p>
        <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight">{product.name}</h3>
        {product.shortDescription && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide">
          <span className="bg-muted px-2 py-1">MOQ {product.moq}</span>
          {product.startingPrice && (
            <span className="bg-muted px-2 py-1">From {formatPrice(product.startingPrice)}</span>
          )}
        </div>
        <Button asChild variant="outline" className="mt-5 w-full">
          <Link href={`/products/${product.slug}`}>View Product</Link>
        </Button>
      </div>
    </article>
  );
}
