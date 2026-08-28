import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p className="font-display text-base font-bold text-foreground">Replyloop</p>
        <nav className="flex flex-wrap gap-6">
          <a href="#platform" className="hover:text-foreground">
            Platform
          </a>
          <a href="#pricing" className="hover:text-foreground">
            Pricing
          </a>
          <a href="#faq" className="hover:text-foreground">
            FAQ
          </a>
          <Link to="/login" className="hover:text-foreground">
            Log in
          </Link>
        </nav>
        <p>&copy; {new Date().getFullYear()} Replyloop. All rights reserved.</p>
      </div>
    </footer>
  );
}
