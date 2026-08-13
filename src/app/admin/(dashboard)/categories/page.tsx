import { prisma } from "@/lib/prisma";
import { CategoryForm } from "@/components/admin/category-form";
import { deleteCategoryAction } from "@/actions/admin";
import { Button } from "@/components/ui/button";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: { children: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-bold uppercase">Categories</h1>
      <CategoryForm />
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.id} className="border border-border p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl font-bold uppercase">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
                {cat.children.length > 0 && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Subcategories: {cat.children.map((c) => c.name).join(", ")}
                  </p>
                )}
              </div>
              <form action={deleteCategoryAction.bind(null, cat.id)}>
                <Button type="submit" variant="destructive" size="sm">Delete</Button>
              </form>
            </div>
            <div className="mt-4"><CategoryForm category={cat} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
