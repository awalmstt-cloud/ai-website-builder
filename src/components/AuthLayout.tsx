import { Link } from "@tanstack/react-router";
import { MessageSquareDot } from "lucide-react";
import type { ReactNode } from "react";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2">
      <div className="hidden md:block">
        <Link to="/" className="inline-flex items-center gap-2 font-display text-sm font-bold">
          <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
            <MessageSquareDot className="size-4" />
          </span>
          Replyloop
        </Link>
        <h2 className="mt-10 font-display text-4xl leading-tight font-bold">
          WhatsApp that answers
          <br />
          <span className="text-primary">before you do</span>
        </h2>
        <p className="mt-4 max-w-sm text-muted-foreground">
          Sessions, media, groups and channels through one API — with AI replies in under a second.
        </p>
        <div className="glass-card mt-10 inline-flex items-center gap-3 rounded-full px-4 py-2 font-mono text-xs text-muted-foreground">
          AI replied · 0.4s <span className="text-primary">✓✓</span>
        </div>
      </div>

      <div className="glass-card rise-in w-full rounded-3xl p-7">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 font-display text-sm font-bold md:hidden"
        >
          <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
            <MessageSquareDot className="size-4" />
          </span>
          Replyloop
        </Link>
        <h1 className="font-display text-2xl font-bold">{title}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-7">{children}</div>
        <p className="mt-6 text-center text-xs text-muted-foreground">{footer}</p>
      </div>
    </div>
  );
}
