import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  Contact,
  FileText,
  Image as ImageIcon,
  MapPin,
  Mic,
  QrCode,
  Send,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";
import { WhatsAppChatDemo } from "@/components/WhatsAppChatDemo";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SafeWachat — WhatsApp API with built-in AI replies" },
      {
        name: "description",
        content:
          "Connect a WhatsApp session in seconds, send any message type through one API, and let AI answer customers in their own language. No per-message fees.",
      },
      { property: "og:title", content: "SafeWachat — WhatsApp API with built-in AI replies" },
      {
        property: "og:description",
        content:
          "One API for WhatsApp sessions, media, groups and channels — with AI auto-replies that answer in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const stats = [
  { value: "10K+", label: "Active developers" },
  { value: "50M+", label: "Messages routed" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "0.6s", label: "Median AI reply" },
];

const steps = [
  {
    icon: QrCode,
    title: "Link a session",
    body: "Scan one QR code from your phone. Sessions stay warm and reconnect on their own.",
  },
  {
    icon: Send,
    title: "Call one endpoint",
    body: "Text, media, polls, locations, contacts — same request shape for every message type.",
  },
  {
    icon: Bot,
    title: "Let AI take the thread",
    body: "Auto-replies pick up tone and language, hand off to a human when confidence drops.",
  },
];

const messageTypes = [
  { icon: ImageIcon, label: "Images", hint: "Photos & captions" },
  { icon: Video, label: "Video", hint: "MP4 & shorts" },
  { icon: FileText, label: "Documents", hint: "PDF, DOCX, XLS" },
  { icon: Mic, label: "Voice", hint: "Audio notes, transcribed" },
  { icon: MapPin, label: "Location", hint: "Live & static pins" },
  { icon: Contact, label: "Contacts", hint: "vCards" },
];

const useCases = [
  {
    title: "Commerce support",
    body: "Stock checks, order status and returns answered from your own catalogue data.",
  },
  {
    title: "Booking desks",
    body: "Clinics, salons and studios confirm, move and remind — without a receptionist.",
  },
  {
    title: "Field operations",
    body: "Broadcast to channels, collect photo proof from crews, log it all to your backend.",
  },
  {
    title: "Internal alerting",
    body: "Pipe deploys, incidents and reports into the group chat your team already watches.",
  },
];

const plans = [
  {
    name: "Starter",
    usd: "$4.99",
    bdt: "৳499",
    period: "per month",
    features: ["1 session", "10,000 messages", "AI replies (text)", "Community support"],
    cta: "Get Starter",
    featured: false,
  },
  {
    name: "Growth",
    usd: "$14.99",
    bdt: "৳1,499",
    period: "per month",
    features: [
      "5 sessions",
      "Unlimited messages",
      "AI replies on every message type",
      "Webhooks & delivery receipts",
      "Email support",
    ],
    cta: "Get Growth",
    featured: true,
  },
  {
    name: "Scale",
    usd: "$49.99",
    bdt: "৳4,999",
    period: "per month",
    features: [
      "Unlimited sessions",
      "Unlimited AI replies",
      "Priority routing",
      "Custom AI knowledge base",
      "99.9% uptime SLA + dedicated engineer",
    ],
    cta: "Get Scale",
    featured: false,
  },
];


const faqs = [
  {
    q: "Do I pay per message?",
    a: "No. Plans are flat monthly — send as much as your sessions can carry.",
  },
  {
    q: "How many numbers can I connect?",
    a: "As many as your plan allows. Each session is isolated with its own webhook target.",
  },
  {
    q: "Can the AI use my own data?",
    a: "Yes. Point it at your catalogue, docs or FAQ and it answers from that source first.",
  },
  {
    q: "What happens if a session drops?",
    a: "It reconnects automatically and we fire a webhook so your backend knows the state.",
  },
];

function Landing() {
  const [currency, setCurrency] = useState<"USD" | "BDT">("USD");
  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <SiteNav />

      {/* HERO — open layout, no box */}
      <section className="relative px-6 pt-20 pb-24 md:pt-28">
        <div className="rise-in relative mx-auto max-w-5xl text-center">
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              SafeWachat AI automation OS for WhatsApp
            </span>

            <h1 className="mt-8 font-display text-6xl leading-[0.98] font-black tracking-[-0.03em] text-foreground md:text-7xl whitespace-nowrap">
              Turn WhatsApp into an
              <br />
              <span className="text-animated-gradient">AI workflow engine.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              QR sessions, webhooks, API sending, and AI replies — wrapped in safety controls so
              automation feels fast, polished, and production-ready.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/register"
                className="glow-ring inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Get full access <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/docs"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
              >
                View API docs
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs text-muted-foreground">
              {[
                { icon: QrCode, label: "QR connect" },
                { icon: Send, label: "One API" },
                { icon: Bot, label: "AI replies" },
                { icon: ShieldCheck, label: "Safety guard" },
              ].map((p) => (
                <li
                  key={p.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5"
                >
                  <p.icon className="size-3.5 text-primary" /> {p.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* stats strip */}
        <div className="glass-card mx-auto mt-10 grid max-w-3xl grid-cols-2 divide-y divide-x divide-border rounded-2xl md:grid-cols-4 md:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-6">
              <p className="font-mono text-2xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORM / API */}
      <section id="platform" className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs tracking-widest text-primary uppercase">The platform</p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              One request shape. Every message type.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Stop juggling per-type SDKs. Send anything WhatsApp supports through a single
              endpoint, then read delivery, receipts and AI activity from the same webhook stream.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {messageTypes.map((m) => (
                <div
                  key={m.label}
                  className="glass-card flex items-center gap-3 rounded-xl px-3 py-3 transition-transform hover:-translate-y-0.5"
                >
                  <m.icon className="size-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{m.label}</p>
                    <p className="truncate text-xs text-muted-foreground">{m.hint}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card overflow-hidden rounded-2xl">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="size-2.5 rounded-full bg-destructive/70" />
              <span className="size-2.5 rounded-full bg-accent/60" />
              <span className="size-2.5 rounded-full bg-primary/70" />
              <p className="ml-2 font-mono text-xs text-muted-foreground">POST /v1/messages</p>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-muted-foreground">
              <code>{`curl https://api.safewachat.online/v1/messages \\
  -H "Authorization: Bearer $API_KEY" \\
  -d '{
    "session": "support-01",
    "to": "+8801700000000",
    "type": "text",
    "text": "Your order ships today 📦",
    "ai": { "autoreply": true, "lang": "auto" }
  }'`}</code>
            </pre>
            <div className="flex items-center gap-2 border-t border-border px-5 py-3 font-mono text-xs text-primary">
              <Sparkles className="size-3.5" /> 201 queued · webhook in 120ms
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs tracking-widest text-primary uppercase">How it works</p>
          <h2 className="mt-4 max-w-lg font-display text-3xl font-bold md:text-4xl">
            Live in under two minutes
          </h2>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="glass-card rounded-2xl p-6 transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <s.icon className="size-5 text-primary" />
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CHAT MOCK — WhatsApp messenger style */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="relative mx-auto w-full max-w-[320px]">
            {/* phone frame */}
            <div className="glow-ring overflow-hidden rounded-[2.5rem] border border-border bg-[#0b141a] shadow-2xl">
              {/* status bar */}
              <div className="flex items-center justify-between bg-[#202c33] px-6 pt-3 pb-1 text-[10px] text-white/70">
                <span>10:22</span>
                <span className="flex items-center gap-1">
                  <span className="inline-block h-1.5 w-3 rounded-[1px] bg-white/60" />
                  <span className="inline-block h-1.5 w-3 rounded-[1px] bg-white/60" />
                  <span className="inline-block h-2 w-4 rounded-[2px] border border-white/60" />
                </span>
              </div>
              {/* chat header */}
              <div className="flex items-center gap-3 bg-[#202c33] px-3 py-2.5">
                <span className="text-white/80">←</span>
                <span className="grid size-9 place-items-center rounded-full bg-[#00a884] text-white">
                  <Bot className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">Maya&apos;s Boutique</p>
                  <p className="text-[11px] text-[#00a884]">online</p>
                </div>
                <span className="flex gap-4 text-white/60">
                  <Video className="size-4" />
                  <Mic className="size-4" />
                </span>
              </div>
              {/* messages — live animated demo */}
              <WhatsAppChatDemo />

              {/* input bar */}
              <div className="flex items-center gap-2 bg-[#0b141a] px-3 py-2.5">
                <div className="flex flex-1 items-center gap-2 rounded-full bg-[#202c33] px-4 py-2 text-[13px] text-white/40">
                  Message
                </div>
                <span className="grid size-9 place-items-center rounded-full bg-[#00a884] text-white">
                  <Mic className="size-4" />
                </span>
              </div>
            </div>
            {/* floating badge */}
            <div className="glass-card absolute -right-10 top-24 hidden rounded-full px-3 py-1.5 font-mono text-[11px] text-primary md:block">
              AI answered · 0.6s
            </div>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest text-primary uppercase">AI layer</p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Answers that sound like your team
            </h2>
            <p className="mt-4 text-muted-foreground">
              Replies are grounded in your own catalogue and docs, mirror the customer&apos;s
              language, and hand the thread to a human the moment confidence drops.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Reads stock, orders and pricing straight from your backend",
                "Detects language per message, not per contact",
                "Escalation rules by keyword, sentiment or confidence",
                "Full transcript and tool-call log for every conversation",
              ].map((f) => (
                <li key={f} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section id="use-cases" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs tracking-widest text-primary uppercase">Use cases</p>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Wherever the conversation already happens
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {useCases.map((u) => (
              <div
                key={u.title}
                className="glass-card rounded-2xl p-6 transition-transform hover:-translate-y-1"
              >
                <h3 className="font-display text-lg font-semibold">{u.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs tracking-widest text-primary uppercase">Pricing</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Flat monthly. Never per message.
            </h2>
            <div className="glass-card inline-flex rounded-full p-1">
              {(["USD", "BDT"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    currency === c
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`glass-card flex flex-col rounded-2xl p-6 ${
                  p.featured ? "glow-ring" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  {p.featured && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-6 font-mono text-4xl font-bold">
                  {currency === "USD" ? p.usd : p.bdt}
                </p>

                <p className="text-xs text-muted-foreground">{p.period}</p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-muted-foreground">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`mt-8 rounded-full px-4 py-2.5 text-center text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                    p.featured
                      ? "bg-primary text-primary-foreground"
                      : "border border-border hover:bg-surface"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-mono text-xs tracking-widest text-primary uppercase">FAQ</p>
            <h2 className="mt-4 font-display text-3xl font-bold">Questions we get a lot</h2>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="size-4 text-primary" /> Sessions encrypted at rest
            </p>
          </div>
          <div className="divide-y divide-border">
            {faqs.map((f) => (
              <div key={f.q} className="py-5">
                <h3 className="font-display text-base font-semibold">{f.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="glass-card mx-auto max-w-4xl rounded-3xl px-8 py-14 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Connect your first session tonight
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Three days free, no card. Keep the API key if you stay.
          </p>
          <Link
            to="/register"
            className="glow-ring mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Create account <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
