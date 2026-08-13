"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppMessage, buildWhatsAppUrl, getWhatsAppNumber } from "@/lib/whatsapp";
import type { WhatsAppContext } from "@/lib/whatsapp";

export function WhatsAppButton({ context }: { context?: WhatsAppContext }) {
  const number = getWhatsAppNumber();
  const message = buildWhatsAppMessage(context);
  const url = buildWhatsAppUrl(number, message);

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 md:bottom-8 md:right-8"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </Link>
  );
}
