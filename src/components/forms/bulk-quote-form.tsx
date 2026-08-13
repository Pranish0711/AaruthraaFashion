"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { submitQuoteRequest } from "@/actions/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUploadZone } from "@/components/forms/file-upload-zone";
import { QUANTITY_RANGES } from "@/lib/constants";
import { buildWhatsAppMessage, buildWhatsAppUrl, getWhatsAppNumber } from "@/lib/whatsapp";

export function BulkQuoteForm({ categories }: { categories: string[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [productCategory, setProductCategory] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("quantity", quantity);
    formData.set("productCategory", productCategory);
    const result = await submitQuoteRequest(formData);
    setLoading(false);
    if (result.success) setSubmitted(true);
    else toast.error(result.error ?? "Something went wrong");
  }

  if (submitted) {
    const whatsappUrl = buildWhatsAppUrl(getWhatsAppNumber(), buildWhatsAppMessage({ page: "bulk-quote" }));
    return (
      <div className="mx-auto max-w-2xl py-20 text-center">
        <h1 className="font-display text-5xl font-bold uppercase">Thank You!</h1>
        <p className="mt-4 text-muted-foreground">We&apos;ve received your bulk quote request and will contact you shortly.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg"><Link href="/products">Continue Exploring</Link></Button>
          <Button asChild variant="accent" size="lg">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label htmlFor="name">Name *</Label><Input id="name" name="name" required className="mt-1.5" /></div>
        <div><Label htmlFor="organization">Organization Name *</Label><Input id="organization" name="organization" required className="mt-1.5" /></div>
        <div><Label htmlFor="phone">Phone *</Label><Input id="phone" name="phone" type="tel" required className="mt-1.5" /></div>
        <div><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" required className="mt-1.5" /></div>
        <div>
          <Label>Product Category *</Label>
          <Select value={productCategory} onValueChange={setProductCategory} required>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div><Label htmlFor="productType">Product Type</Label><Input id="productType" name="productType" className="mt-1.5" /></div>
        <div>
          <Label>Quantity *</Label>
          <Select value={quantity} onValueChange={setQuantity} required>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select quantity" /></SelectTrigger>
            <SelectContent>
              {QUANTITY_RANGES.map((q) => <SelectItem key={q} value={q}>{q} pieces</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div><Label htmlFor="deliveryLocation">Delivery Location</Label><Input id="deliveryLocation" name="deliveryLocation" className="mt-1.5" /></div>
        <div className="md:col-span-2"><Label htmlFor="expectedDeliveryDate">Expected Delivery Date</Label><Input id="expectedDeliveryDate" name="expectedDeliveryDate" type="date" className="mt-1.5" /></div>
        <div className="md:col-span-2"><Label htmlFor="customizationRequirement">Customization Requirement</Label><Textarea id="customizationRequirement" name="customizationRequirement" className="mt-1.5" rows={3} /></div>
        <div className="md:col-span-2"><Label htmlFor="additionalNotes">Additional Notes</Label><Textarea id="additionalNotes" name="additionalNotes" className="mt-1.5" rows={3} /></div>
        <div className="md:col-span-2">
          <Label>Upload Logo / Reference</Label>
          <div className="mt-1.5"><FileUploadZone /></div>
        </div>
      </div>
      <Button type="submit" variant="accent" size="lg" disabled={loading || !quantity || !productCategory}>
        {loading ? "Submitting..." : "Get My Bulk Quote"}
      </Button>
    </form>
  );
}
