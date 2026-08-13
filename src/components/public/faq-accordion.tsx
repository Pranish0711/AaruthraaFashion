"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FAQ = { question: string; answer: string };

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border border-border">
      {items.map((item, i) => (
        <div key={item.question}>
          <button
            className="flex w-full items-center justify-between px-6 py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-display text-lg font-bold uppercase md:text-xl">{item.question}</span>
            <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform", open === i && "rotate-180")} />
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-muted-foreground">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}
