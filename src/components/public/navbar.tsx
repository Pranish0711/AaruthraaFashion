"use client";

import Link from "next/link";
import { X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function AnnouncementBar({ text }: { text: string }) {
  return (
    <div className="bg-foreground py-2.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-background md:text-sm">
      {text}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled ? "border-border bg-background/95 backdrop-blur-md" : "border-transparent bg-background",
        )}
      >
        <div className="container-wide flex h-16 items-center justify-between px-4 md:h-20 md:px-8">
          <Link href="/" className="font-display text-xl font-bold uppercase tracking-wider md:text-2xl">
            AaruthraaFashion
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild variant="default" size="sm" className="hidden sm:inline-flex">
              <Link href="/bulk-quote">Get Bulk Quote</Link>
            </Button>
            <button
              className="inline-flex h-10 w-10 items-center justify-center lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-foreground text-background lg:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <span className="font-display text-xl font-bold uppercase">AaruthraaFashion</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 px-6 pt-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-bold uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="accent" size="lg" className="mt-4">
              <Link href="/bulk-quote" onClick={() => setOpen(false)}>Get Bulk Quote</Link>
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}
