"use server";

import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";

export async function getSiteSettings() {
  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });
    if (!settings) {
      settings = await prisma.siteSettings.create({ data: { id: "default" } });
    }
    return settings;
  } catch {
    return {
      id: "default",
      businessName: "AaruthraaFashion",
      businessEmail: "info@aaruthraafashion.in",
      whatsappNumber: process.env.WHATSAPP_NUMBER ?? "917871317044",
      contactNumber: "+91 78713 17044",
      address: "Erode, Tamil Nadu, India",
      businessHours: "Mon–Sat, 9:00 AM – 6:00 PM IST",
      instagramUrl: null,
      facebookUrl: null,
      logoUrl: null,
      announcementText: "WHOLESALE & BULK ORDERS | CUSTOM APPAREL | MOQ FROM 100 PCS",
      faqSamplesAnswer: "Yes, sample units can be arranged for bulk orders subject to product type and customization requirements.",
      updatedAt: new Date(),
    };
  }
}

export async function upsertCustomer(data: {
  name: string;
  organization?: string;
  phone: string;
  email: string;
  city?: string;
  state?: string;
}) {
  const existing = await prisma.customer.findFirst({
    where: { OR: [{ email: data.email }, { phone: data.phone }] },
  });

  if (existing) {
    return prisma.customer.update({
      where: { id: existing.id },
      data: {
        name: data.name,
        organization: data.organization,
        phone: data.phone,
        email: data.email,
        city: data.city,
        state: data.state,
      },
    });
  }

  return prisma.customer.create({ data });
}

export async function uploadFormFiles(files: File[], folder: string) {
  const results: { url: string; filename: string; publicId: string }[] = [];

  for (const file of files) {
    if (file.size === 0) continue;
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadImage(buffer, folder, `${Date.now()}-${file.name}`);
    if (uploaded) {
      results.push({ url: uploaded.url, filename: file.name, publicId: uploaded.publicId });
    }
  }

  return results;
}
