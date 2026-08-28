import { Link } from "@tanstack/react-router";
import { MessageSquareDot } from "lucide-react";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "How it works", href: "#how" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
];

export function SiteNav() {
  return (
    <header className="sticky top-4 z-50 px-4">
      <nav className="glass-card mx-auto flex max-w-5xl items-center gap-6 rounded-full px-4 py-2.5">
        <Link to="/" className="flex items-center gap-2 font-display text-sm font-bold">
          <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
            <MessageSquareDot className="size-4" />
          </span>
          Replyloop
        </Link>

        <ul className="ml-auto hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            to="/login"
            className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="glow-ring rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Start free
          </Link>
        </div>
      </nav>
    </header>
  );
}
