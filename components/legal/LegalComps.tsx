"use client";

import * as React from "react";
import { ArrowUp, Menu, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

/**
 * Small highlighted callout used inline within a section to flag anything
 * related to Matjr's AI features (e.g. the review summarizer) so readers
 * can spot AI-specific data handling at a glance.
 */
export function AiCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 flex gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <p className="text-sm leading-relaxed text-foreground/90">{children}</p>
    </div>
  );
}

function TocList({
  sections,
  activeId,
  onNavigate,
}: {
  sections: LegalSection[];
  activeId: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-1">
      {sections.map((section, i) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={onNavigate}
          className={cn(
            "group flex items-baseline gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
            activeId === section.id
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <span className="w-5 shrink-0 text-xs tabular-nums text-muted-foreground/60">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{section.title}</span>
        </a>
      ))}
    </nav>
  );
}

export function LegalPageLayout({
  eyebrow,
  title,
  description,
  lastUpdated,
  sections,
}: LegalPageLayoutProps) {
  const [activeId, setActiveId] = React.useState(sections[0]?.id ?? "");
  const [progress, setProgress] = React.useState(0);
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  // Reading progress + back-to-top visibility
  React.useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
      setShowBackToTop(scrollTop > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy for active section
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress bar */}
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <header className="border-b bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-primary">
            {eyebrow}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Last updated {lastUpdated}</Badge>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              Covers AI features
            </Badge>
          </div>
        </div>
      </header>

      {/* Mobile TOC trigger */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b bg-background/95 px-6 py-3 backdrop-blur lg:hidden">
        <span className="text-sm font-medium">
          {sections.find((s) => s.id === activeId)?.title ?? "Contents"}
        </span>
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="outline" size="sm" className="gap-2">
                <Menu className="h-4 w-4" />
                Contents
              </Button>
            }
          />
          <SheetContent side="right" className="w-72">
            <div className="mt-8">
              <TocList sections={sections} activeId={activeId} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[220px_1fr]">
        {/* Desktop sidebar TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-8">
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              On this page
            </p>
            <TocList sections={sections} activeId={activeId} />
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0">
          <div className="flex flex-col gap-12">
            {sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24"
              >
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="text-sm font-medium text-primary/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight">
                    {section.title}
                  </h2>
                </div>
                <div className="prose-legal text-sm leading-relaxed text-foreground/85 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_li]:my-1 [&_p]:my-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5">
                  {section.content}
                </div>
                {i < sections.length - 1 && <Separator className="mt-12" />}
              </section>
            ))}
          </div>
        </main>
      </div>

      {/* Back to top */}
      <Button
        size="icon"
        variant="secondary"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-6 right-6 z-40 rounded-full shadow-md transition-opacity duration-200",
          showBackToTop ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-label="Back to top"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </div>
  );
}
