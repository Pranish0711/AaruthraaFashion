import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toggleProductActiveAction, toggleProductFeaturedAction, deleteProductAction } from "@/actions/admin";
import { formatPrice } from "@/lib/utils";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true, images: { where: { isPrimary: true }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold uppercase">Products</h1>
        <Button asChild><Link href="/admin/products/new">Add Product</Link></Button>
      </div>
      <div className="overflow-x-auto border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">MOQ</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <Link href={`/admin/products/${p.id}/edit`} className="font-medium hover:underline">{p.name}</Link>
                  {p.featured && <Badge variant="accent" className="ml-2">Featured</Badge>}
                </td>
                <td className="px-4 py-3">{p.category.name}</td>
                <td className="px-4 py-3">{p.moq}</td>
                <td className="px-4 py-3">{p.startingPrice ? formatPrice(p.startingPrice) : "—"}</td>
                <td className="px-4 py-3">{p.active ? "Active" : "Inactive"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <form action={toggleProductActiveAction.bind(null, p.id, !p.active)}>
                      <Button type="submit" variant="outline" size="sm">{p.active ? "Deactivate" : "Activate"}</Button>
                    </form>
                    <form action={toggleProductFeaturedAction.bind(null, p.id, !p.featured)}>
                      <Button type="submit" variant="outline" size="sm">{p.featured ? "Unfeature" : "Feature"}</Button>
                    </form>
                    <form action={deleteProductAction.bind(null, p.id)}>
                      <Button type="submit" variant="destructive" size="sm">Delete</Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
