import { AnnouncementBar, Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { WhatsAppButton } from "@/components/public/whatsapp-button";
import { getSiteSettings } from "@/lib/db-helpers";

export const dynamic = "force-dynamic";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <AnnouncementBar text={settings.announcementText} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
