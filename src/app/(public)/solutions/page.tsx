import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/public/motion";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Wholesale apparel solutions for corporate, schools, sports teams and events.",
};

const solutions = [
  {
    title: "Corporate & MNC",
    items: ["Employee uniforms", "Corporate events", "Promotional apparel", "Branded T-shirts", "Team clothing"],
  },
  {
    title: "Schools & Colleges",
    items: ["Department T-shirts", "College culturals", "Sports day", "Farewell events", "College clubs", "NSS / NCC", "College merchandise"],
  },
  {
    title: "Sports Teams",
    items: ["Team jerseys", "Sports T-shirts", "Track pants", "Shorts", "Player name and number printing"],
  },
  {
    title: "Events & Groups",
    items: ["Marathons", "Campaigns", "Associations", "Functions", "Large group orders"],
  },
];

export default function SolutionsPage() {
  return (
    <div className="section-padding">
      <div className="container-wide">
        <SectionHeading
          title="Solutions"
          subtitle="Wholesale and custom apparel for every organization type."
          align="left"
        />
        <div className="grid gap-8 md:grid-cols-2">
          {solutions.map((section) => (
            <div key={section.title} className="border border-border bg-card p-8">
              <h2 className="font-display text-2xl font-bold uppercase">{section.title}</h2>
              <ul className="mt-6 space-y-2 text-muted-foreground">
                {section.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-8">
                <Link href="/bulk-quote">Request a Quote</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
