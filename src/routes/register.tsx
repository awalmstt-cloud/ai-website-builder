import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AuroraBackground } from "@/components/AuroraBackground";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your SafeWA account" },
      {
        name: "description",
        content:
          "Start a 3-day free trial: connect a WhatsApp session, send any message type, and turn on AI replies.",
      },
      { property: "og:title", content: "Create your SafeWA account" },
      {
        property: "og:description",
        content: "Three days free. Connect a session and turn on AI replies in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <AuthLayout
        title="Start your trial"
        subtitle="Three days free. No card, no per-message fees."
        footer={
          <>
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </>
        }
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Field label="Full name" name="name" placeholder="Amila Hasan" />
          <Field label="Work email" type="email" name="email" placeholder="you@company.com" />
          <Field label="Password" type="password" name="password" placeholder="At least 8 characters" />
          <button
            type="submit"
            className="glow-ring mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Create account <ArrowRight className="size-4" />
          </button>
        </form>
      </AuthLayout>
    </div>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-xl border border-input bg-surface px-3.5 py-2.5 text-sm outline-none transition-shadow placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
