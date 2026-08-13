import { getSiteSettings } from "@/lib/db-helpers";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function SettingsPage() {
  const settings = await getSiteSettings();
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold uppercase">Settings</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
