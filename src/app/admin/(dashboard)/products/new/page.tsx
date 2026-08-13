import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/product-form";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold uppercase">Add Product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
