import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BellRing,
  BookOpen,
  Bot,
  KeyRound,
  QrCode,
  Send,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { AuroraBackground } from "@/components/AuroraBackground";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Docs — SafeWA WhatsApp API" },
      {
        name: "description",
        content:
          "SafeWA developer docs: create an API key, link a WhatsApp session with one QR scan, send any message type, and switch on AI auto-replies.",
      },
      { property: "og:title", content: "Docs — SafeWA WhatsApp API" },
      {
        property: "og:description",
        content:
          "Create an API key, link a session with one QR scan, send any message type, and switch on AI auto-replies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Docs,
});

const sidebar = [
  { id: "quickstart", label: "Quickstart", icon: Zap },
  { id: "auth", label: "Authentication", icon: KeyRound },
  { id: "sessions", label: "Sessions & QR", icon: QrCode },
  { id: "messages", label: "Send messages", icon: Send },
  { id: "ai-replies", label: "AI replies", icon: Bot },
  { id: "webhooks", label: "Webhooks", icon: BellRing },
  { id: "errors", label: "Errors & limits", icon: ShieldCheck },
];

function Code({ title, code, footer }: { title: string; code: string; footer?: string }) {
  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-destructive/70" />
        <span className="size-2.5 rounded-full bg-accent/60" />
        <span className="size-2.5 rounded-full bg-primary/70" />
        <p className="ml-2 font-mono text-xs text-muted-foreground">{title}</p>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-muted-foreground">
        <code>{code}</code>
      </pre>
      {footer ? (
        <div className="border-t border-border px-5 py-3 font-mono text-xs text-primary">{footer}</div>
      ) : null}
    </div>
  );
}

type Snippet = { lang: string; code: string };

function CodeTabs({
  title,
  snippets,
  footer,
}: {
  title: string;
  snippets: Snippet[];
  footer?: string;
}) {
  const [active, setActive] = useState(0);
  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
        <p className="font-mono text-xs text-muted-foreground">{title}</p>
        <div className="ml-auto flex flex-wrap gap-1">
          {snippets.map((s, i) => (
            <button
              key={s.lang}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${
                i === active
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.lang}
            </button>
          ))}
        </div>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-muted-foreground">
        <code>{(snippets[active] ?? snippets[0])?.code}</code>
      </pre>
      {footer ? (
        <div className="border-t border-border px-5 py-3 font-mono text-xs text-primary">{footer}</div>
      ) : null}
    </div>
  );
}

function Section({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <p className="font-mono text-xs tracking-widest text-primary uppercase">{kicker}</p>
      <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">{title}</h2>
      <div className="mt-5 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
        {children}
      </div>
    </section>
  );
}

function Method({ method, path }: { method: "GET" | "POST" | "PATCH" | "DELETE"; path: string }) {
  const color =
    method === "GET"
      ? "text-primary"
      : method === "DELETE"
        ? "text-destructive"
        : "text-accent";
  return (
    <p className="glass-card inline-flex items-center gap-3 rounded-lg px-4 py-2.5 font-mono text-xs">
      <span className={`font-bold ${color}`}>{method}</span>
      <span className="text-foreground">{path}</span>
    </p>
  );
}

function Docs() {
  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <SiteNav />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pt-14 pb-8 lg:flex-row">
        {/* sidebar */}
        <aside className="lg:w-56 lg:shrink-0">
          <div className="glass-card rounded-2xl p-4 lg:sticky lg:top-24">
            <p className="flex items-center gap-2 px-2 pb-3 font-display text-sm font-bold">
              <BookOpen className="size-4 text-primary" /> Developer docs
            </p>
            <nav className="flex flex-col gap-0.5 text-sm">
              {sidebar.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                >
                  <s.icon className="size-3.5 shrink-0 text-primary/80" />
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* content */}
        <div className="min-w-0 flex-1 space-y-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              API v1 · stable
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl">
              SafeWA documentation
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              এই পেজে ধাপে ধাপে দেখানো হয়েছে কীভাবে আপনার WhatsApp নম্বর কানেক্ট করে মেসেজ পাঠাবেন
              এবং AI auto-reply চালু করবেন — সব একটাই API দিয়ে।
            </p>
          </div>

          {/* plain-language glossary */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: KeyRound,
                term: "API key",
                desc: "আপনার অ্যাকাউন্টের পাসওয়ার্ডের মতো একটা গোপন কোড। প্রতিটা request-এর সাথে এটা পাঠাতে হয়, যাতে SafeWA বোঝে আপনিই কল করছেন।",
              },
              {
                icon: QrCode,
                term: "Session",
                desc: "একটা session মানে একটা WhatsApp নম্বর কানেক্ট করা। QR স্ক্যান করলেই session চালু হয়ে যায় — ঠিক WhatsApp Web-এর মতো।",
              },
              {
                icon: BellRing,
                term: "Webhook",
                desc: "আপনার সার্ভারের একটা URL। কেউ আপনাকে WhatsApp-এ মেসেজ দিলে SafeWA সেই URL-এ খবর পাঠিয়ে দেয়।",
              },
            ].map((g) => (
              <div key={g.term} className="glass-card rounded-xl p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <g.icon className="size-4 text-primary" /> {g.term}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{g.desc}</p>
              </div>
            ))}
          </div>

          <Section id="quickstart" kicker="Start here" title="Quickstart — ৩ ধাপে শুরু করুন">
            <p>
              মাত্র ৩টা কাজ করলেই আপনার প্রথম মেসেজ চলে যাবে। কোনো জটিল সেটআপ নেই — নিচের ধাপগুলো
              একে একে ফলো করুন:
            </p>
            <ol className="grid gap-4 sm:grid-cols-3">
              {[
                ["01", "API key বানান", "Dashboard-এ গিয়ে Settings → API keys → New key চাপুন। কপি করে রাখুন।"],
                ["02", "WhatsApp কানেক্ট করুন", "POST /v1/sessions কল করুন, QR কোড পাবেন — ফোন থেকে স্ক্যান করুন।"],
                ["03", "মেসেজ পাঠান", "POST /v1/messages-এ session-এর নাম আর প্রাপকের নম্বর দিন। ব্যস!"],
              ].map(([n, t, b]) => (
                <li key={n} className="glass-card rounded-xl p-4">
                  <p className="font-mono text-xs text-muted-foreground">{n}</p>
                  <p className="mt-2 text-sm font-semibold text-foreground">{t}</p>
                  <p className="mt-1 text-xs">{b}</p>
                </li>
              ))}
            </ol>
            <CodeTabs
              title="First message in 10 lines"
              snippets={[
                {
                  lang: "cURL",
                  code: `curl https://api.safewa.dev/v1/messages \\
  -H "Authorization: Bearer $SAFEWA_API_KEY" \\
  -d '{
    "session": "default",
    "to": "+8801700000000",
    "type": "text",
    "text": "Hello from SafeWA 👋"
  }'`,
                },
                {
                  lang: "JavaScript",
                  code: `const res = await fetch("https://api.safewa.dev/v1/messages", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.SAFEWA_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    session: "default",
    to: "+8801700000000",
    type: "text",
    text: "Hello from SafeWA 👋",
  }),
});
console.log(await res.json());`,
                },
                {
                  lang: "Python",
                  code: `import os, requests

res = requests.post(
    "https://api.safewa.dev/v1/messages",
    headers={"Authorization": f"Bearer {os.environ['SAFEWA_API_KEY']}"},
    json={
        "session": "default",
        "to": "+8801700000000",
        "type": "text",
        "text": "Hello from SafeWA 👋",
    },
)
print(res.json())`,
                },
              ]}
              footer="→ 201 Created · message queued"
            />
          </Section>

          <Section id="auth" kicker="Security" title="Authentication">
            <p>
              প্রতিটা request-এর সাথে আপনার API key পাঠাতে হয় <code className="font-mono text-foreground">Authorization</code>{" "}
              header-এ। key হারিয়ে গেলে বা চাইলে যেকোনো সময় নতুন key বানাতে বা পুরোনোটা বন্ধ করতে
              পারবেন — কোড বদলাতে হবে না।
            </p>
            <Method method="GET" path="https://api.safewa.dev/v1/whoami" />
            <Code
              title="Authorization header"
              code={`Authorization: Bearer swa_live_9f3…c2
# test keys use the swa_test_ prefix`}
              footer='{ "workspace": "acme-shop", "plan": "growth" }'
            />
            <p className="glass-card rounded-xl border-l-2 border-l-primary px-4 py-3 text-xs">
              সতর্কতা: live key কখনো মোবাইল অ্যাপ বা ব্রাউজারে রাখবেন না — সবাই দেখে ফেলতে পারবে।
              সবসময় নিজের backend থেকে কল করুন।
            </p>
          </Section>

          <Section id="sessions" kicker="Connections" title="Sessions & QR linking">
            <p>
              মনে করুন একটা session = একটা WhatsApp নম্বর। session বানান, QR ছবিটা নিন, ফোনের
              WhatsApp থেকে স্ক্যান করুন — ব্যস, কানেক্ট হয়ে গেছে। ফোন ঘুমিয়ে গেলেও session নিজে
              নিজে আবার জুড়ে যায়।
            </p>
            <Method method="POST" path="/v1/sessions" />
            <CodeTabs
              title="Create and link a session"
              snippets={[
                {
                  lang: "cURL",
                  code: `curl -X POST https://api.safewa.dev/v1/sessions \\
  -H "Authorization: Bearer $SAFEWA_API_KEY" \\
  -d '{ "name": "support-01", "webhook": "https://your.app/hooks/safewa" }'

# then fetch the QR
curl https://api.safewa.dev/v1/sessions/support-01/qr \\
  -H "Authorization: Bearer $SAFEWA_API_KEY"`,
                },
                {
                  lang: "JavaScript",
                  code: `await fetch("https://api.safewa.dev/v1/sessions", {
  method: "POST",
  headers: { Authorization: \`Bearer \${KEY}\` },
  body: JSON.stringify({
    name: "support-01",
    webhook: "https://your.app/hooks/safewa",
  }),
});

// then fetch the QR
const qr = await fetch(
  "https://api.safewa.dev/v1/sessions/support-01/qr",
  { headers: { Authorization: \`Bearer \${KEY}\` } }
).then((r) => r.json());`,
                },
                {
                  lang: "Python",
                  code: `requests.post(
    "https://api.safewa.dev/v1/sessions",
    headers={"Authorization": f"Bearer {KEY}"},
    json={"name": "support-01",
          "webhook": "https://your.app/hooks/safewa"},
)

# then fetch the QR
qr = requests.get(
    "https://api.safewa.dev/v1/sessions/support-01/qr",
    headers={"Authorization": f"Bearer {KEY}"},
).json()`,
                },
              ]}
              footer='{ "qr": "data:image/png;base64,…", "expires_in": 60 }'
            />
            <ul className="space-y-2 text-sm">
              {[
                "QR কোড ৬০ সেকেন্ড পরে মেয়াদ শেষ হয় — নতুন করে চাইলে আরেকটা নিয়ে নিন।",
                "একটা নম্বর = একটা session। প্রতিটা session আলাদা, নিজের webhook URL সহ।",
                "কানেক্ট/ডিসকানেক্ট হলে সাথে সাথেই আপনার webhook-এ খবর চলে আসবে।",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="messages" kicker="Core API" title="Send messages">
            <p>
              One request shape for everything WhatsApp supports — text, images, video, documents,
              voice notes, locations, contacts and polls. Change the <code className="font-mono text-foreground">type</code> field, keep the rest.
            </p>
            <Method method="POST" path="/v1/messages" />
            <Code
              title="Text, image and location — same shape"
              code={`# text
{ "type": "text", "text": "Your order ships today 📦" }

# image with caption
{ "type": "image", "url": "https://cdn.you.com/look.png",
  "caption": "New drop 🔥" }

# location pin
{ "type": "location",
  "lat": 23.8103, "lng": 90.4125,
  "name": "Pickup point", "address": "Dhaka" }`}
              footer="→ every call returns a message id + queued state"
            />
            <p>
              Responses include a <code className="font-mono text-foreground">message_id</code> you can
              reconcile with delivery receipts on the webhook stream.
            </p>
          </Section>

          <Section id="ai-replies" kicker="AI layer" title="AI auto-replies">
            <p>
              Add the <code className="font-mono text-foreground">ai</code> block to any session or
              message and SafeWA answers incoming threads from your own data — catalogue, docs or FAQ
              — in the customer&apos;s language, usually in under a second.
            </p>
            <CodeTabs
              title="Enable auto-reply on a session"
              snippets={[
                {
                  lang: "cURL",
                  code: `curl -X PATCH https://api.safewa.dev/v1/sessions/support-01 \\
  -H "Authorization: Bearer $SAFEWA_API_KEY" \\
  -d '{
    "ai": {
      "autoreply": true,
      "lang": "auto",
      "knowledge": ["https://your.app/faq.json"],
      "handoff": { "min_confidence": 0.6, "notify": "+8801700000000" }
    }
  }'`,
                },
                {
                  lang: "JavaScript",
                  code: `await fetch("https://api.safewa.dev/v1/sessions/support-01", {
  method: "PATCH",
  headers: { Authorization: \`Bearer \${KEY}\` },
  body: JSON.stringify({
    ai: {
      autoreply: true,
      lang: "auto",
      knowledge: ["https://your.app/faq.json"],
      handoff: { min_confidence: 0.6, notify: "+8801700000000" },
    },
  }),
});`,
                },
                {
                  lang: "Python",
                  code: `requests.patch(
    "https://api.safewa.dev/v1/sessions/support-01",
    headers={"Authorization": f"Bearer {KEY}"},
    json={
        "ai": {
            "autoreply": True,
            "lang": "auto",
            "knowledge": ["https://your.app/faq.json"],
            "handoff": {"min_confidence": 0.6,
                        "notify": "+8801700000000"},
        }
    },
)`,
                },
              ]}
              footer="→ AI replies stream to your webhook with tool-call logs"
            />
            <ul className="space-y-2 text-sm">
              {[
                "Per-message language detection — Bangla, English, or mixed threads just work.",
                "Escalate on keyword, sentiment, or low confidence; humans take the thread mid-flow.",
                "Every reply ships with a transcript and the sources it grounded on.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="webhooks" kicker="Realtime" title="Webhooks">
            <p>
              One webhook per session receives messages, delivery receipts, session state changes
              and AI activity. Verify the signature header before processing.
            </p>
            <Code
              title="Incoming message payload"
              code={`POST https://your.app/hooks/safewa
X-SafeWA-Signature: sha256=…

{
  "event": "message.received",
  "session": "support-01",
  "from": "+8801700000000",
  "type": "text",
  "text": "Do you have this in blue?",
  "ai": { "replied": true, "latency_ms": 410 }
}`}
              footer="200 OK within 5s or we retry with backoff"
            />
          </Section>

          <Section id="errors" kicker="Reference" title="Errors & rate limits">
            <p>
              Errors use a consistent JSON shape. Rate limits apply per key: 60 req/s on Growth,
              200 req/s on Scale, with <code className="font-mono text-foreground">429</code> and a{" "}
              <code className="font-mono text-foreground">retry_after</code> hint when exceeded.
            </p>
            <Code
              title="Error response"
              code={`{
  "error": {
    "code": "session_not_linked",
    "message": "Session 'support-01' is not linked. Scan the QR first.",
    "retry_after": null
  }
}`}
            />
            <div className="glass-card rounded-xl p-4 font-mono text-xs">
              <div className="grid grid-cols-3 gap-2 text-muted-foreground">
                <span className="text-foreground">400</span><span>bad_request</span><span>Invalid payload shape</span>
                <span className="text-foreground">401</span><span>unauthorized</span><span>Missing or revoked key</span>
                <span className="text-foreground">404</span><span>session_not_found</span><span>Wrong session name</span>
                <span className="text-foreground">409</span><span>session_not_linked</span><span>QR not scanned yet</span>
                <span className="text-foreground">429</span><span>rate_limited</span><span>Back off, see retry_after</span>
              </div>
            </div>
          </Section>

          <div className="glass-card flex flex-col items-start justify-between gap-4 rounded-2xl p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-lg font-bold">Ready to ship?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Create a workspace and send your first message in under two minutes.
              </p>
            </div>
            <Link
              to="/register"
              className="glow-ring inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Start free <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
