"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
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
    <div className={cn("mb-12", align === "center" && "text-center")}>
      <h2 className="font-display text-4xl font-bold uppercase tracking-tight md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 max-w-2xl text-muted-foreground md:text-lg", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
