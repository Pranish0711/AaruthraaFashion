import { cn } from "@/lib/utils";

export function FadeIn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("animate-fade-up", className)}>{children}</div>;
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
    <div className={cn("mb-12 animate-fade-up", align === "center" && "text-center")}>
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
