"use client";

import { useState } from "react";
import { toast } from "sonner";
import { submitContactForm } from "@/actions/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const result = await submitContactForm(new FormData(e.currentTarget));
    setLoading(false);
    if (result.success) {
      toast.success("Message sent successfully!");
      e.currentTarget.reset();
    } else {
      toast.error(result.error ?? "Failed to send message");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><Label htmlFor="name">Name *</Label><Input id="name" name="name" required className="mt-1.5" /></div>
      <div><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" required className="mt-1.5" /></div>
      <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" type="tel" className="mt-1.5" /></div>
      <div><Label htmlFor="message">Message *</Label><Textarea id="message" name="message" required rows={5} className="mt-1.5" /></div>
      <Button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Message"}</Button>
    </form>
  );
}
