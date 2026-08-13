import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().min(1).optional(),
  WHATSAPP_NUMBER: z.string().min(10),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().min(10),
});

function getServerEnv() {
  return serverEnvSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  });
}

function getClientEnv() {
  return clientEnvSchema.parse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    NEXT_PUBLIC_WHATSAPP_NUMBER:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? process.env.WHATSAPP_NUMBER ?? "919876543210",
  });
}

export const env = {
  get server() {
    return getServerEnv();
  },
  get client() {
    return getClientEnv();
  },
};
