"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import type { RequestStatus } from "@prisma/client";

export async function updateRequestStatus(
  type: "customization" | "quote" | "contact",
  id: string,
  status: RequestStatus,
  internalNotes?: string,
) {
  await requireAdmin();

  if (type === "customization") {
    await prisma.customizationRequest.update({
      where: { id },
      data: { status, ...(internalNotes !== undefined && { internalNotes }) },
    });
    revalidatePath("/admin/customization-requests");
  } else if (type === "quote") {
    await prisma.quoteRequest.update({
      where: { id },
      data: { status, ...(internalNotes !== undefined && { internalNotes }) },
    });
    revalidatePath("/admin/quote-requests");
  } else {
    await prisma.contactSubmission.update({ where: { id }, data: { status } });
  }

  revalidatePath("/admin");
}

export async function deleteQuoteRequestAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.quoteRequest.delete({ where: { id } });
  revalidatePath("/admin/quote-requests");
}

export async function deleteProductAction(id: string): Promise<void> {
  await requireAdmin();
  const images = await prisma.productImage.findMany({ where: { productId: id } });
  for (const img of images) {
    if (img.cloudinaryPublicId) await deleteImage(img.cloudinaryPublicId);
  }
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function toggleProductActiveAction(id: string, active: boolean): Promise<void> {
  await requireAdmin();
  await prisma.product.update({ where: { id }, data: { active } });
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function toggleProductFeaturedAction(id: string, featured: boolean): Promise<void> {
  await requireAdmin();
  await prisma.product.update({ where: { id }, data: { featured } });
  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function deleteCategoryAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}

export async function saveProduct(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const slug = (formData.get("slug") as string) || slugify(name);
  const parseJson = (key: string) => {
    const val = formData.get(key) as string;
    return val ? val.split(",").map((s) => s.trim()).filter(Boolean) : [];
  };

  const data = {
    name,
    slug,
    shortDescription: formData.get("shortDescription") as string,
    fullDescription: formData.get("fullDescription") as string,
    categoryId: formData.get("categoryId") as string,
    subcategory: (formData.get("subcategory") as string) || null,
    productType: formData.get("productType") as string,
    startingPrice: formData.get("startingPrice") ? parseFloat(formData.get("startingPrice") as string) : null,
    moq: parseInt(formData.get("moq") as string) || 100,
    fabrics: parseJson("fabrics"),
    gsmOptions: parseJson("gsmOptions"),
    colors: parseJson("colors"),
    sizes: parseJson("sizes"),
    customizationOptions: parseJson("customizationOptions"),
    customizationAvailable: formData.get("customizationAvailable") === "on",
    featured: formData.get("featured") === "on",
    active: formData.get("active") === "on",
  };

  let product;
  if (id) {
    product = await prisma.product.update({ where: { id }, data });
  } else {
    product = await prisma.product.create({ data });
  }

  const imageFiles = formData.getAll("images") as File[];
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    if (!(file instanceof File) || file.size === 0) continue;
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadImage(buffer, "products", `${product.slug}-${Date.now()}-${i}`);
    if (uploaded) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: uploaded.url,
          cloudinaryPublicId: uploaded.publicId,
          displayOrder: i,
          isPrimary: i === 0 && !(await prisma.productImage.findFirst({ where: { productId: product.id, isPrimary: true } })),
        },
      });
    }
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  return { success: true, id: product.id };
}

export async function saveCategory(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const data = {
    name,
    slug: (formData.get("slug") as string) || slugify(name),
    description: (formData.get("description") as string) || null,
    displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
    parentId: (formData.get("parentId") as string) || null,
    imageUrl: (formData.get("imageUrl") as string) || null,
  };

  if (id) {
    await prisma.category.update({ where: { id }, data });
  } else {
    await prisma.category.create({ data });
  }

  revalidatePath("/admin/categories");
  revalidatePath("/products");
  return { success: true };
}

export async function saveSiteSettings(formData: FormData) {
  await requireAdmin();

  await prisma.siteSettings.update({
    where: { id: "default" },
    data: {
      businessName: formData.get("businessName") as string,
      businessEmail: formData.get("businessEmail") as string,
      whatsappNumber: formData.get("whatsappNumber") as string,
      contactNumber: (formData.get("contactNumber") as string) || null,
      address: (formData.get("address") as string) || null,
      businessHours: (formData.get("businessHours") as string) || null,
      instagramUrl: (formData.get("instagramUrl") as string) || null,
      facebookUrl: (formData.get("facebookUrl") as string) || null,
      announcementText: formData.get("announcementText") as string,
      faqSamplesAnswer: formData.get("faqSamplesAnswer") as string,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}

export async function changePassword(formData: FormData) {
  const session = await requireAdmin();
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return { error: "User not found" };

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) return { error: "Current password is incorrect" };

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(newPassword, 12) },
  });

  return { success: true };
}

export async function deleteProductImageAction(id: string): Promise<void> {
  await requireAdmin();
  const image = await prisma.productImage.findUnique({ where: { id } });
  if (!image) return;
  if (image.cloudinaryPublicId) await deleteImage(image.cloudinaryPublicId);
  await prisma.productImage.delete({ where: { id } });
  revalidatePath("/admin/products");
}

export async function setPrimaryImageAction(id: string, productId: string): Promise<void> {
  await requireAdmin();
  await prisma.productImage.updateMany({ where: { productId }, data: { isPrimary: false } });
  await prisma.productImage.update({ where: { id }, data: { isPrimary: true } });
  revalidatePath("/admin/products");
}
