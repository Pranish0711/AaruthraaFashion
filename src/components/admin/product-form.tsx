"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveProduct } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

type Category = { id: string; name: string };
type ProductData = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  categoryId: string;
  subcategory: string | null;
  productType: string;
  startingPrice: number | null;
  moq: number;
  fabrics: string[];
  gsmOptions: string[];
  colors: string[];
  sizes: string[];
  customizationOptions: string[];
  customizationAvailable: boolean;
  featured: boolean;
  active: boolean;
};

export function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: ProductData;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("categoryId", categoryId);
    if (product) formData.set("id", product.id);
    const result = await saveProduct(formData);
    setLoading(false);
    if (result.success) {
      toast.success(product ? "Product updated" : "Product created");
      router.push("/admin/products");
      router.refresh();
    } else {
      toast.error("Failed to save product");
    }
  }

  const arr = (key: keyof ProductData) =>
    product && Array.isArray(product[key]) ? (product[key] as string[]).join(", ") : "";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label htmlFor="name">Product Name *</Label><Input id="name" name="name" defaultValue={product?.name} required className="mt-1.5" /></div>
        <div><Label htmlFor="slug">Slug</Label><Input id="slug" name="slug" defaultValue={product?.slug} className="mt-1.5" /></div>
        <div>
          <Label>Category *</Label>
          <Select value={categoryId} onValueChange={setCategoryId} required>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div><Label htmlFor="subcategory">Subcategory</Label><Input id="subcategory" name="subcategory" defaultValue={product?.subcategory ?? ""} className="mt-1.5" /></div>
        <div><Label htmlFor="productType">Product Type *</Label><Input id="productType" name="productType" defaultValue={product?.productType ?? "Apparel"} required className="mt-1.5" /></div>
        <div><Label htmlFor="startingPrice">Starting Price (₹)</Label><Input id="startingPrice" name="startingPrice" type="number" defaultValue={product?.startingPrice ?? ""} className="mt-1.5" /></div>
        <div><Label htmlFor="moq">MOQ</Label><Input id="moq" name="moq" type="number" defaultValue={product?.moq ?? 100} className="mt-1.5" /></div>
      </div>
      <div><Label htmlFor="shortDescription">Short Description *</Label><Input id="shortDescription" name="shortDescription" defaultValue={product?.shortDescription} required className="mt-1.5" /></div>
      <div><Label htmlFor="fullDescription">Full Description *</Label><Textarea id="fullDescription" name="fullDescription" defaultValue={product?.fullDescription} required rows={5} className="mt-1.5" /></div>
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label htmlFor="fabrics">Fabrics (comma-separated)</Label><Input id="fabrics" name="fabrics" defaultValue={arr("fabrics")} className="mt-1.5" /></div>
        <div><Label htmlFor="gsmOptions">GSM Options</Label><Input id="gsmOptions" name="gsmOptions" defaultValue={arr("gsmOptions")} className="mt-1.5" /></div>
        <div><Label htmlFor="colors">Colors</Label><Input id="colors" name="colors" defaultValue={arr("colors")} className="mt-1.5" /></div>
        <div><Label htmlFor="sizes">Sizes</Label><Input id="sizes" name="sizes" defaultValue={arr("sizes")} className="mt-1.5" /></div>
        <div className="md:col-span-2"><Label htmlFor="customizationOptions">Customization Options</Label><Input id="customizationOptions" name="customizationOptions" defaultValue={arr("customizationOptions")} className="mt-1.5" /></div>
      </div>
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2"><Checkbox name="customizationAvailable" defaultChecked={product?.customizationAvailable ?? true} />Customization Available</label>
        <label className="flex items-center gap-2"><Checkbox name="featured" defaultChecked={product?.featured} />Featured Product</label>
        <label className="flex items-center gap-2"><Checkbox name="active" defaultChecked={product?.active ?? true} />Active</label>
      </div>
      <div><Label htmlFor="images">Product Images</Label><Input id="images" name="images" type="file" accept="image/*" multiple className="mt-1.5" /></div>
      <Button type="submit" disabled={loading}>{loading ? "Saving..." : product ? "Update Product" : "Create Product"}</Button>
    </form>
  );
}
