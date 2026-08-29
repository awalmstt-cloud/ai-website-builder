import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — SafeWachat" },
      {
        name: "description",
        content: "Sign in to your SafeWachat account to manage WhatsApp sessions and AI replies.",
      },
      { property: "og:title", content: "Log in — SafeWachat" },
      {
        property: "og:description",
        content: "Sign in to manage your WhatsApp sessions and AI auto-replies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <AuthLayout
        title="Welcome back"
        subtitle="Pick up where your sessions left off."
        footer={
          <>
            New here?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Create an account
            </Link>
          </>
        }
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void navigate({ to: "/dashboard" });
          }}
        >
          <Field label="Email" type="email" name="email" placeholder="you@company.com" />
          <Field label="Password" type="password" name="password" placeholder="••••••••" />
          <button
            type="submit"
            className="glow-ring mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Log in <ArrowRight className="size-4" />
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
