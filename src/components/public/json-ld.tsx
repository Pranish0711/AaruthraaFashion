import { getCachedSiteSettings } from "@/lib/data";
import { buildLocalBusinessJsonLd } from "@/lib/seo";

export async function JsonLd() {
  const settings = await getCachedSiteSettings();
  const data = buildLocalBusinessJsonLd(settings);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
