"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveCategory } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  displayOrder: number;
  imageUrl: string | null;
};

export function CategoryForm({ category }: { category?: Category }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (category) formData.set("id", category.id);
    await saveCategory(formData);
    setLoading(false);
    toast.success(category ? "Category updated" : "Category created");
    router.refresh();
    if (!category) e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-border p-6">
      <h3 className="font-display text-lg font-bold uppercase">{category ? "Edit Category" : "Add Category"}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label htmlFor="name">Name *</Label><Input id="name" name="name" defaultValue={category?.name} required className="mt-1.5" /></div>
        <div><Label htmlFor="slug">Slug</Label><Input id="slug" name="slug" defaultValue={category?.slug} className="mt-1.5" /></div>
        <div><Label htmlFor="displayOrder">Display Order</Label><Input id="displayOrder" name="displayOrder" type="number" defaultValue={category?.displayOrder ?? 0} className="mt-1.5" /></div>
        <div><Label htmlFor="imageUrl">Image URL</Label><Input id="imageUrl" name="imageUrl" defaultValue={category?.imageUrl ?? ""} className="mt-1.5" /></div>
        <div className="md:col-span-2"><Label htmlFor="description">Description</Label><Textarea id="description" name="description" defaultValue={category?.description ?? ""} className="mt-1.5" /></div>
      </div>
      <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Category"}</Button>
    </form>
  );
}
