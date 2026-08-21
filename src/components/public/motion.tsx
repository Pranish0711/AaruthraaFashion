"use client";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/public/scroll-reveal";

export function FadeIn({
  children,
  className,
  delay,
  immediate,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  return (
    <ScrollReveal className={className} delay={delay} immediate={immediate}>
      {children}
    </ScrollReveal>
  );
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <ScrollReveal className={cn("mb-12", align === "center" && "text-center")}>
      <h2 className="font-display text-4xl font-bold uppercase tracking-tight md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 max-w-2xl text-muted-foreground md:text-lg", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
