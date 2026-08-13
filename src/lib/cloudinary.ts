import { v2 as cloudinary } from "cloudinary";

let configured = false;

function ensureConfigured() {
  if (configured) return true;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return false;
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  configured = true;
  return true;
}

export async function uploadImage(
  file: Buffer,
  folder: string,
  filename: string,
): Promise<{ url: string; publicId: string } | null> {
  if (!ensureConfigured()) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `aaruthraa/${folder}`,
        public_id: filename.replace(/\.[^/.]+$/, ""),
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload failed"));
          return;
        }
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );
    stream.end(file);
  });
}

export async function deleteImage(publicId: string) {
  if (!ensureConfigured()) return;
  await cloudinary.uploader.destroy(publicId);
}

export function isCloudinaryConfigured() {
  return ensureConfigured();
}
