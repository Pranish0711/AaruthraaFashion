import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/product-form";
import { deleteProductImageAction, setPrimaryImageAction } from "@/actions/admin";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { displayOrder: "asc" } } },
    }),
    prisma.category.findMany({ where: { parentId: null }, orderBy: { displayOrder: "asc" } }),
  ]);

  if (!product) notFound();

  const productData = {
    ...product,
    fabrics: product.fabrics as string[],
    gsmOptions: product.gsmOptions as string[],
    colors: product.colors as string[],
    sizes: product.sizes as string[],
    customizationOptions: product.customizationOptions as string[],
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold uppercase">Edit Product</h1>
      {product.images.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase">Current Images</h2>
          <div className="flex flex-wrap gap-4">
            {product.images.map((img) => (
              <div key={img.id} className="relative">
                <div className="relative h-24 w-24 overflow-hidden border border-border">
                  <Image src={img.url} alt="" fill className="object-cover" sizes="96px" />
                </div>
                {img.isPrimary && <span className="text-xs font-semibold text-accent">Primary</span>}
                <div className="mt-1 flex gap-1">
                  {!img.isPrimary && (
                    <form action={setPrimaryImageAction.bind(null, img.id, product.id)}>
                      <Button type="submit" variant="outline" size="sm">Set Primary</Button>
                    </form>
                  )}
                  <form action={deleteProductImageAction.bind(null, img.id)}>
                    <Button type="submit" variant="destructive" size="sm">Delete</Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ProductForm categories={categories} product={productData} />
    </div>
  );
}
