"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { submitCustomizationRequest } from "@/actions/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUploadZone } from "@/components/forms/file-upload-zone";
import { QUANTITY_RANGES } from "@/lib/constants";
import { buildWhatsAppMessage, buildWhatsAppUrl, getWhatsAppNumber } from "@/lib/whatsapp";

type ProductOption = { id: string; name: string; slug: string };

export function CustomizationForm({
  products,
  preselected,
}: {
  products: ProductOption[];
  preselected?: ProductOption | null;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(preselected?.slug ?? "");
  const [quantityRange, setQuantityRange] = useState("");

  useEffect(() => {
    const slug = searchParams.get("product");
    if (slug) setSelectedSlug(slug);
  }, [searchParams]);

  const selectedProduct = products.find((p) => p.slug === selectedSlug) ?? preselected;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (selectedProduct) {
      formData.set("productId", selectedProduct.id);
      formData.set("productName", selectedProduct.name);
    }
    formData.set("quantityRange", quantityRange);
    const result = await submitCustomizationRequest(formData);
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      toast.error(result.error ?? "Something went wrong");
    }
  }

  if (submitted) {
    const whatsappUrl = buildWhatsAppUrl(getWhatsAppNumber(), buildWhatsAppMessage({ page: "general" }));
    return (
      <div className="mx-auto max-w-2xl py-20 text-center">
        <h1 className="font-display text-5xl font-bold uppercase">Thank You!</h1>
        <p className="mt-4 text-muted-foreground">
          We&apos;ve received your customization request. Our team will review your requirements and contact you shortly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild variant="default" size="lg">
            <Link href="/products">Continue Exploring</Link>
          </Button>
          <Button asChild variant="accent" size="lg">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-10">
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold uppercase">Basic Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label htmlFor="name">Name *</Label><Input id="name" name="name" required className="mt-1.5" /></div>
          <div><Label htmlFor="organization">Company / Organization</Label><Input id="organization" name="organization" className="mt-1.5" /></div>
          <div><Label htmlFor="phone">Phone *</Label><Input id="phone" name="phone" type="tel" required className="mt-1.5" /></div>
          <div><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" required className="mt-1.5" /></div>
          <div><Label htmlFor="city">City</Label><Input id="city" name="city" className="mt-1.5" /></div>
          <div><Label htmlFor="state">State</Label><Input id="state" name="state" className="mt-1.5" /></div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold uppercase">Order Requirements</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Selected Product *</Label>
            <Select value={selectedSlug} onValueChange={setSelectedSlug}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select product" /></SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.slug}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Required Quantity *</Label>
            <Select value={quantityRange} onValueChange={setQuantityRange} required>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select quantity range" /></SelectTrigger>
              <SelectContent>
                {QUANTITY_RANGES.map((q) => (
                  <SelectItem key={q} value={q}>{q} pieces</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="expectedDeliveryDate">Expected Delivery Date</Label>
            <Input id="expectedDeliveryDate" name="expectedDeliveryDate" type="date" className="mt-1.5" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold uppercase">Product Customization</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div><Label htmlFor="fabricPreference">Fabric Preference</Label><Input id="fabricPreference" name="fabricPreference" className="mt-1.5" /></div>
          <div><Label htmlFor="gsmPreference">GSM Preference</Label><Input id="gsmPreference" name="gsmPreference" className="mt-1.5" /></div>
          <div><Label htmlFor="colorPreference">Color Preference</Label><Input id="colorPreference" name="colorPreference" className="mt-1.5" /></div>
          <div><Label htmlFor="sizeRange">Size Range</Label><Input id="sizeRange" name="sizeRange" placeholder="e.g. S to XXL" className="mt-1.5" /></div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["logoRequired", "Logo requirement"],
            ["frontPrinting", "Front printing"],
            ["backPrinting", "Back printing"],
            ["sleevePrinting", "Sleeve printing"],
            ["embroidery", "Embroidery"],
            ["dtfPrinting", "DTF printing"],
            ["screenPrinting", "Screen printing"],
            ["playerName", "Player name"],
            ["playerNumber", "Player number"],
          ].map(([name, label]) => (
            <label key={name} className="flex items-center gap-2 text-sm">
              <Checkbox name={name} />
              {label}
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold uppercase">Design Upload</h2>
        <FileUploadZone />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold uppercase">Additional Requirements</h2>
        <Textarea
          name="additionalRequirements"
          placeholder="I need navy blue track pants with our company logo on the left side and white stripes."
          rows={5}
        />
      </section>

      <Button type="submit" variant="accent" size="lg" disabled={loading || !selectedProduct || !quantityRange}>
        {loading ? "Submitting..." : "Request Custom Quote"}
      </Button>
    </form>
  );
}
