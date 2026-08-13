"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { upsertCustomer, uploadFormFiles } from "@/lib/db-helpers";
import { QUANTITY_RANGES } from "@/lib/constants";

const customizationSchema = z.object({
  name: z.string().min(2),
  organization: z.string().optional(),
  phone: z.string().min(10),
  email: z.string().email(),
  city: z.string().optional(),
  state: z.string().optional(),
  productId: z.string().optional(),
  productName: z.string().min(1),
  quantityRange: z.enum(QUANTITY_RANGES as unknown as [string, ...string[]]),
  expectedDeliveryDate: z.string().optional(),
  fabricPreference: z.string().optional(),
  gsmPreference: z.string().optional(),
  colorPreference: z.string().optional(),
  sizeRange: z.string().optional(),
  logoRequired: z.boolean().optional(),
  frontPrinting: z.boolean().optional(),
  backPrinting: z.boolean().optional(),
  sleevePrinting: z.boolean().optional(),
  embroidery: z.boolean().optional(),
  dtfPrinting: z.boolean().optional(),
  screenPrinting: z.boolean().optional(),
  playerName: z.boolean().optional(),
  playerNumber: z.boolean().optional(),
  additionalRequirements: z.string().optional(),
});

export async function submitCustomizationRequest(formData: FormData) {
  try {
    const raw = {
      name: formData.get("name") as string,
      organization: (formData.get("organization") as string) || undefined,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      city: (formData.get("city") as string) || undefined,
      state: (formData.get("state") as string) || undefined,
      productId: (formData.get("productId") as string) || undefined,
      productName: formData.get("productName") as string,
      quantityRange: formData.get("quantityRange") as string,
      expectedDeliveryDate: (formData.get("expectedDeliveryDate") as string) || undefined,
      fabricPreference: (formData.get("fabricPreference") as string) || undefined,
      gsmPreference: (formData.get("gsmPreference") as string) || undefined,
      colorPreference: (formData.get("colorPreference") as string) || undefined,
      sizeRange: (formData.get("sizeRange") as string) || undefined,
      logoRequired: formData.get("logoRequired") === "on",
      frontPrinting: formData.get("frontPrinting") === "on",
      backPrinting: formData.get("backPrinting") === "on",
      sleevePrinting: formData.get("sleevePrinting") === "on",
      embroidery: formData.get("embroidery") === "on",
      dtfPrinting: formData.get("dtfPrinting") === "on",
      screenPrinting: formData.get("screenPrinting") === "on",
      playerName: formData.get("playerName") === "on",
      playerNumber: formData.get("playerNumber") === "on",
      additionalRequirements: (formData.get("additionalRequirements") as string) || undefined,
    };

    const data = customizationSchema.parse(raw);
    const customer = await upsertCustomer(data);

    const request = await prisma.customizationRequest.create({
      data: {
        customerId: customer.id,
        productId: data.productId || null,
        productName: data.productName,
        quantityRange: data.quantityRange,
        expectedDeliveryDate: data.expectedDeliveryDate ? new Date(data.expectedDeliveryDate) : null,
        fabricPreference: data.fabricPreference,
        gsmPreference: data.gsmPreference,
        colorPreference: data.colorPreference,
        sizeRange: data.sizeRange,
        logoRequired: data.logoRequired ?? false,
        frontPrinting: data.frontPrinting ?? false,
        backPrinting: data.backPrinting ?? false,
        sleevePrinting: data.sleevePrinting ?? false,
        embroidery: data.embroidery ?? false,
        dtfPrinting: data.dtfPrinting ?? false,
        screenPrinting: data.screenPrinting ?? false,
        playerName: data.playerName ?? false,
        playerNumber: data.playerNumber ?? false,
        additionalRequirements: data.additionalRequirements,
      },
    });

    const fileEntries = formData.getAll("files") as File[];
    const validFiles = fileEntries.filter((f) => f instanceof File && f.size > 0);
    if (validFiles.length > 0) {
      const uploads = await uploadFormFiles(validFiles, "customization");
      if (uploads.length > 0) {
        await prisma.customizationFile.createMany({
          data: uploads.map((u) => ({
            requestId: request.id,
            url: u.url,
            filename: u.filename,
            cloudinaryPublicId: u.publicId,
          })),
        });
      }
    }

    revalidatePath("/admin/customization-requests");
    return { success: true, id: request.id };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to submit request. Please check your details." };
  }
}

const quoteSchema = z.object({
  name: z.string().min(2),
  organization: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  productCategory: z.string().min(1),
  productType: z.string().optional(),
  quantity: z.string().min(1),
  customizationRequirement: z.string().optional(),
  deliveryLocation: z.string().optional(),
  expectedDeliveryDate: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export async function submitQuoteRequest(formData: FormData) {
  try {
    const raw = {
      name: formData.get("name") as string,
      organization: formData.get("organization") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      productCategory: formData.get("productCategory") as string,
      productType: (formData.get("productType") as string) || undefined,
      quantity: formData.get("quantity") as string,
      customizationRequirement: (formData.get("customizationRequirement") as string) || undefined,
      deliveryLocation: (formData.get("deliveryLocation") as string) || undefined,
      expectedDeliveryDate: (formData.get("expectedDeliveryDate") as string) || undefined,
      additionalNotes: (formData.get("additionalNotes") as string) || undefined,
    };

    const data = quoteSchema.parse(raw);
    const customer = await upsertCustomer(data);

    const request = await prisma.quoteRequest.create({
      data: {
        customerId: customer.id,
        productCategory: data.productCategory,
        productType: data.productType,
        quantity: data.quantity,
        customizationRequirement: data.customizationRequirement,
        deliveryLocation: data.deliveryLocation,
        expectedDeliveryDate: data.expectedDeliveryDate ? new Date(data.expectedDeliveryDate) : null,
        additionalNotes: data.additionalNotes,
      },
    });

    const fileEntries = formData.getAll("files") as File[];
    const validFiles = fileEntries.filter((f) => f instanceof File && f.size > 0);
    if (validFiles.length > 0) {
      const uploads = await uploadFormFiles(validFiles, "quotes");
      if (uploads.length > 0) {
        await prisma.quoteFile.createMany({
          data: uploads.map((u) => ({
            requestId: request.id,
            url: u.url,
            filename: u.filename,
            cloudinaryPublicId: u.publicId,
          })),
        });
      }
    }

    revalidatePath("/admin/quote-requests");
    return { success: true, id: request.id };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to submit quote request." };
  }
}

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export async function submitContactForm(formData: FormData) {
  try {
    const data = contactSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      message: formData.get("message"),
    });

    await prisma.contactSubmission.create({ data });
    revalidatePath("/admin");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to send message." };
  }
}
