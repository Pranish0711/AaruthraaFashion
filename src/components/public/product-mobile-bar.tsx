import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ProductMobileBar({
  productSlug,
  productName,
  whatsappUrl,
}: {
  productSlug: string;
  productName: string;
  whatsappUrl: string;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-2 border-t border-border bg-background p-3 md:hidden">
      <Button asChild variant="accent" className="flex-1" size="sm">
        <Link href={`/customize?product=${productSlug}`}>Customize</Link>
      </Button>
      <Button asChild variant="outline" className="flex-1" size="sm">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </Button>
    </div>
  );
}
