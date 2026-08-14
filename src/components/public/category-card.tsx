import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type CategoryCardProps = {
  title: string;
  headline: string;
  description: string;
  href: string;
  buttonText: string;
  imageUrl?: string | null;
  priceTag?: string;
  moqTag?: string;
  priority?: boolean;
};

export function CategoryCard({
  title,
  headline,
  description,
  href,
  buttonText,
  imageUrl,
  priceTag,
  moqTag,
  priority = false,
}: CategoryCardProps) {
  return (
    <div className="group relative min-h-[480px] overflow-hidden border border-border bg-foreground text-background md:min-h-[560px]">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority={priority}
          className="object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      )}
      <div className="relative flex h-full flex-col justify-end p-8 md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{title}</p>
        <h3 className="mt-3 font-display text-3xl font-bold uppercase leading-tight md:text-4xl lg:text-5xl">
          {headline}
        </h3>
        <p className="mt-4 max-w-md text-sm text-neutral-300 md:text-base">{description}</p>
        {(priceTag || moqTag) && (
          <div className="mt-4 flex flex-wrap gap-3">
            {priceTag && <span className="font-display text-2xl font-bold text-accent">{priceTag}</span>}
            {moqTag && <span className="self-center text-xs font-semibold uppercase tracking-wider">{moqTag}</span>}
          </div>
        )}
        <Button asChild variant="accent" size="lg" className="mt-8 w-fit">
          <Link href={href}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
}
