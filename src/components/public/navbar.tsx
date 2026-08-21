"use client";

import Link from "next/link";
import { X, Menu, Sparkles } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
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
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 20;
        setScrolled((prev) => (prev !== next ? next : prev));
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-background",
          scrolled ? "border-border shadow-sm" : "border-transparent",
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
                prefetch={link.href === "/" ? undefined : true}
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button asChild variant="outline" size="sm" className="hidden md:inline-flex gap-1.5">
              <Link href="/customize">
                <Sparkles className="h-3.5 w-3.5" />
                Make Your Design
              </Link>
            </Button>
            <Button asChild variant="default" size="sm" className="hidden sm:inline-flex">
              <Link href="/bulk-quote">Get Bulk Quote</Link>
            </Button>
            <button
              type="button"
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
            <button type="button" onClick={closeMenu} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 px-6 pt-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="font-display text-3xl font-bold uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="accent" size="lg" className="mt-4 gap-2">
              <Link href="/customize" onClick={closeMenu}>
                <Sparkles className="h-4 w-4" />
                Make Your Own Design
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-background text-background">
              <Link href="/bulk-quote" onClick={closeMenu}>
                Get Bulk Quote
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}
