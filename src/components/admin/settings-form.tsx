"use client";

import { useState } from "react";
import { toast } from "sonner";
import { saveSiteSettings, changePassword } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Settings = {
  businessName: string;
  businessEmail: string;
  whatsappNumber: string;
  contactNumber: string | null;
  address: string | null;
  businessHours: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  announcementText: string;
  faqSamplesAnswer: string;
};

export function SettingsForm({ settings }: { settings: Settings }) {
  const [loading, setLoading] = useState(false);

  async function handleSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await saveSiteSettings(new FormData(e.currentTarget));
    setLoading(false);
    toast.success("Settings saved");
  }

  async function handlePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const result = await changePassword(new FormData(e.currentTarget));
    setLoading(false);
    if (result.error) toast.error(result.error);
    else {
      toast.success("Password updated");
      e.currentTarget.reset();
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form onSubmit={handleSettings} className="space-y-4 border border-border p-6">
        <h2 className="font-display text-lg font-bold uppercase">Site Settings</h2>
        <div><Label htmlFor="businessName">Business Name</Label><Input id="businessName" name="businessName" defaultValue={settings.businessName} className="mt-1.5" /></div>
        <div><Label htmlFor="businessEmail">Business Email</Label><Input id="businessEmail" name="businessEmail" type="email" defaultValue={settings.businessEmail} className="mt-1.5" /></div>
        <div><Label htmlFor="whatsappNumber">WhatsApp Number</Label><Input id="whatsappNumber" name="whatsappNumber" defaultValue={settings.whatsappNumber} className="mt-1.5" /></div>
        <div><Label htmlFor="contactNumber">Contact Number</Label><Input id="contactNumber" name="contactNumber" defaultValue={settings.contactNumber ?? ""} className="mt-1.5" /></div>
        <div><Label htmlFor="address">Address</Label><Textarea id="address" name="address" defaultValue={settings.address ?? ""} className="mt-1.5" /></div>
        <div><Label htmlFor="businessHours">Business Hours</Label><Input id="businessHours" name="businessHours" defaultValue={settings.businessHours ?? ""} className="mt-1.5" /></div>
        <div><Label htmlFor="instagramUrl">Instagram URL</Label><Input id="instagramUrl" name="instagramUrl" defaultValue={settings.instagramUrl ?? ""} className="mt-1.5" /></div>
        <div><Label htmlFor="facebookUrl">Facebook URL</Label><Input id="facebookUrl" name="facebookUrl" defaultValue={settings.facebookUrl ?? ""} className="mt-1.5" /></div>
        <div><Label htmlFor="announcementText">Announcement Bar Text</Label><Input id="announcementText" name="announcementText" defaultValue={settings.announcementText} className="mt-1.5" /></div>
        <div><Label htmlFor="faqSamplesAnswer">FAQ — Samples Answer</Label><Textarea id="faqSamplesAnswer" name="faqSamplesAnswer" defaultValue={settings.faqSamplesAnswer} className="mt-1.5" rows={3} /></div>
        <Button type="submit" disabled={loading}>Save Settings</Button>
      </form>

      <form onSubmit={handlePassword} className="space-y-4 border border-border p-6 h-fit">
        <h2 className="font-display text-lg font-bold uppercase">Change Password</h2>
        <div><Label htmlFor="currentPassword">Current Password</Label><Input id="currentPassword" name="currentPassword" type="password" required className="mt-1.5" /></div>
        <div><Label htmlFor="newPassword">New Password</Label><Input id="newPassword" name="newPassword" type="password" required minLength={8} className="mt-1.5" /></div>
        <Button type="submit" disabled={loading}>Update Password</Button>
      </form>
    </div>
  );
}
