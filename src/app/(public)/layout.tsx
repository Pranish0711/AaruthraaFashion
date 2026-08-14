import { AnnouncementBar, Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { WhatsAppButton } from "@/components/public/whatsapp-button";
import { JsonLd } from "@/components/public/json-ld";
import { getCachedSiteSettings } from "@/lib/data";

export const revalidate = 300;

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getCachedSiteSettings();

  return (
    <>
      <JsonLd />
      <AnnouncementBar text={settings.announcementText} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
