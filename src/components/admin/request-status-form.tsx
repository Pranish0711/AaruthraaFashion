"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateRequestStatus } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REQUEST_STATUSES } from "@/lib/constants";

export function RequestStatusForm({
  type,
  id,
  currentStatus,
  internalNotes,
}: {
  type: "customization" | "quote";
  id: string;
  currentStatus: string;
  internalNotes: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(internalNotes);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await updateRequestStatus(type, id, status as never, notes);
    setLoading(false);
    toast.success("Status updated");
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border p-6 space-y-4">
      <h2 className="font-display text-lg font-bold uppercase">Request Status</h2>
      <div>
        <Label>Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
          <SelectContent>
            {REQUEST_STATUSES.map((s) => <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="notes">Internal Notes</Label>
        <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className="mt-1.5" placeholder="Customer contacted through WhatsApp..." />
      </div>
      <Button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Status"}</Button>
    </form>
  );
}
