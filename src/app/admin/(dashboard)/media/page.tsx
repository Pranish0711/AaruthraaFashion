import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MediaPage() {
  const configured = isCloudinaryConfigured();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold uppercase">Media</h1>
      <Card>
        <CardHeader><CardTitle>Cloudinary Storage</CardTitle></CardHeader>
        <CardContent>
          {configured ? (
            <p className="text-sm text-muted-foreground">
              Cloudinary is configured. Product and form uploads are stored in your Cloudinary account under the <code>aaruthraa/</code> folder.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to your environment variables to enable image uploads.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
