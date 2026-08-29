import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  BarChart3,
  BookOpen,
  Bot,
  Copy,
  CreditCard,
  Gauge,
  KeyRound,
  LogOut,
  MessageSquareDot,
  QrCode,
  Rocket,
  Send,
  Settings,
  ShieldCheck,
  Smartphone,
  Users,
  Webhook,
} from "lucide-react";



export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SafeWachat" },
      {
        name: "description",
        content:
          "Manage WhatsApp sessions, monitor message delivery and AI replies from the SafeWachat dashboard.",
      },
      { property: "og:title", content: "Dashboard — SafeWachat" },
      {
        property: "og:description",
        content: "Sessions, message volume, AI replies and API keys in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

const nav = [
  { id: "overview", label: "Overview", icon: Gauge },
  { id: "sessions", label: "WhatsApp Sessions", icon: Smartphone },
  { id: "onboarding", label: "Onboarding", icon: Rocket },
  { id: "messages", label: "Messages", icon: Send },
  { id: "contacts", label: "Contacts", icon: Users },
  { id: "webhooks", label: "Webhooks", icon: Webhook },
  { id: "ai", label: "AI Assistant", icon: Bot },
  { id: "safety", label: "Safety Center", icon: ShieldCheck },
  { id: "keys", label: "API Keys", icon: KeyRound },
  { id: "usage", label: "Usage", icon: BarChart3 },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type TabId = (typeof nav)[number]["id"];


const stats = [
  { label: "Messages sent", value: "48,213", delta: "+12.4%" },
  { label: "AI replies", value: "19,806", delta: "+8.1%" },
  { label: "Active sessions", value: "6", delta: "2 idle" },
  { label: "Avg. reply time", value: "0.62s", delta: "-0.06s" },
];

const volume = [32, 45, 38, 62, 55, 78, 66, 84, 71, 92, 80, 97];

const sessions = [
  { name: "support-01", number: "+880 1700-000000", status: "connected", msgs: "12,904" },
  { name: "sales-bd", number: "+880 1811-222333", status: "connected", msgs: "8,431" },
  { name: "orders-bot", number: "+880 1999-888777", status: "connected", msgs: "6,120" },
  { name: "marketing-2", number: "—", status: "scan qr", msgs: "0" },
  { name: "legacy-01", number: "+880 1555-444333", status: "disconnected", msgs: "3,002" },
];

const activity = [
  { to: "+880 1712-345678", text: "Your order #4821 has been shipped.", kind: "AI", time: "2m" },
  { to: "+880 1934-119922", text: "Sure! Our pricing starts at $19/mo.", kind: "AI", time: "6m" },
  { to: "+880 1888-772211", text: "invoice-august.pdf", kind: "Document", time: "14m" },
  { to: "+880 1611-505050", text: "Welcome to SafeWachat 🎉", kind: "Template", time: "31m" },
];

function DashboardPage() {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <div className="relative min-h-screen font-display tracking-[-0.02em]">

      <div className="relative mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-6">
        {/* sidebar */}
        <aside className="glass-card sticky top-6 hidden h-[calc(100vh-3rem)] w-60 shrink-0 flex-col rounded-3xl p-4 md:flex">
          <Link to="/" className="mb-6 flex items-center gap-2 px-2 font-display text-sm font-bold">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <MessageSquareDot className="size-4" />
            </span>
            SafeWachat
          </Link>

          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors ${
                  tab === item.id
                    ? "bg-surface text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </button>
            ))}
            <Link
              to="/docs"
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <BookOpen className="size-4" /> Docs
            </Link>
          </nav>



          <div className="mt-auto">
            <div className="glass-card rounded-2xl p-3 text-xs text-muted-foreground">
              <p className="font-mono text-[11px] text-foreground">Growth plan</p>
              <p className="mt-1">48,213 / 100,000 messages</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
                <div className="h-full w-1/2 rounded-full bg-primary" />
              </div>
            </div>
            <Link
              to="/login"
              className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut className="size-4" /> Log out
            </Link>
          </div>
        </aside>

        {/* main */}
        <main className="min-w-0 flex-1 space-y-6">
          <header className="glass-card flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3">
            <div>
              <h1 className="font-display text-lg font-bold">
                {nav.find((n) => n.id === tab)?.label}
              </h1>
              <p className="text-xs text-muted-foreground">
                api.safewachat.online · production workspace
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="glass-card inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
                <span className="size-2 rounded-full bg-primary" /> All systems normal
              </span>
              <span className="grid size-9 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                A
              </span>
            </div>
          </header>

          {/* mobile nav */}
          <div className="flex gap-2 overflow-x-auto md:hidden">
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors ${
                  tab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "glass-card text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === "overview" && <Overview />}
          {tab === "sessions" && <Sessions />}
          {tab === "messages" && <Messages />}
          {tab === "ai" && <AiReplies />}
          {tab === "webhooks" && <Webhooks />}
          {tab === "keys" && <ApiKeys />}
          {tab === "settings" && <SettingsPanel />}
        </main>
      </div>
    </div>
  );
}

function Card({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="glass-card rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="font-display text-sm font-bold">{title}</h2>
        {action && <div className="ml-auto">{action}</div>}
      </div>
      {children}
    </section>
  );
}

function StatusPill({ status }: { status: string }) {
  const tone =
    status === "connected"
      ? "text-primary"
      : status === "scan qr"
        ? "text-accent"
        : "text-destructive";
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] ${tone}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
            <p className="mt-1 font-mono text-[11px] text-primary">{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card
          title="Message volume · last 12 hours"
          action={
            <span className="font-mono text-[11px] text-muted-foreground">hourly delivery</span>
          }
        >
          <div className="flex h-44 items-end gap-2">
            {volume.map((v, i) => (
              <div key={i} className="flex-1">
                <div
                  className="rounded-t-md bg-primary/70 transition-colors hover:bg-primary"
                  style={{ height: `${v * 1.6}px` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
            <span>12:00</span>
            <span>18:00</span>
            <span>now</span>
          </div>
        </Card>

        <Card title="Recent activity">
          <ul className="space-y-3">
            {activity.map((a) => (
              <li key={a.to} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-surface">
                  <Activity className="size-3.5 text-primary" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm">{a.text}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {a.to} · {a.kind} · {a.time} ago
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Sessions">
        <SessionTable />
      </Card>
    </div>
  );
}

type Session = { name: string; number: string; status: string; msgs: string };

function SessionTable({ rows = sessions }: { rows?: Session[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-xs text-muted-foreground">
            <th className="pb-2 font-normal">Session</th>
            <th className="pb-2 font-normal">Number</th>
            <th className="pb-2 font-normal">Status</th>
            <th className="pb-2 text-right font-normal">Messages</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.name} className="border-t border-border/60">
              <td className="py-3 font-mono text-xs">{s.name}</td>
              <td className="py-3 text-muted-foreground">{s.number}</td>
              <td className="py-3">
                <StatusPill status={s.status} />
              </td>
              <td className="py-3 text-right font-mono text-xs">{s.msgs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QrPattern({ seed }: { seed: string }) {
  const size = 25;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const cells: boolean[] = [];
  for (let i = 0; i < size * size; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    cells.push(((h >> 16) & 1) === 1);
  }
  const isFinder = (r: number, c: number) => {
    const inBox = (r0: number, c0: number) =>
      r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7;
    return inBox(0, 0) || inBox(0, size - 7) || inBox(size - 7, 0);
  };
  const finderOn = (r: number, c: number) => {
    const rr = r < 7 ? r : r - (size - 7);
    const cc = c < 7 ? c : c - (size - 7);
    const ring = Math.max(Math.abs(rr - 3), Math.abs(cc - 3));
    return ring !== 2 && ring !== 4;
  };
  return (
    <div
      className="grid rounded-xl bg-white p-3"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, width: 220, height: 220 }}
    >
      {cells.map((on, i) => {
        const r = Math.floor(i / size);
        const c = i % size;
        const dark = isFinder(r, c) ? finderOn(r, c) : on;
        return <span key={i} className={dark ? "bg-[#0b141a]" : "bg-white"} />;
      })}
    </div>
  );
}

function Sessions() {
  const [rows, setRows] = useState<Session[]>(sessions);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [active, setActive] = useState<Session | null>(null);
  const [connected, setConnected] = useState(false);

  function create(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return setError("Session name is required.");
    if (rows.some((r) => r.name === trimmed)) return setError("This session name already exists.");
    const created: Session = {
      name: trimmed,
      number: number.trim() || "—",
      status: "scan qr",
      msgs: "0",
    };
    setRows((prev) => [created, ...prev]);
    setActive(created);
    setConnected(false);
    setOpen(false);
    setName("");
    setNumber("");
    setError("");
  }

  function markConnected() {
    if (!active) return;
    setRows((prev) =>
      prev.map((r) => (r.name === active.name ? { ...r, status: "connected" } : r)),
    );
    setConnected(true);
  }

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card
          title="All sessions"
          action={
            <button
              onClick={() => {
                setOpen(true);
                setError("");
              }}
              className="glow-ring rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground"
            >
              New session
            </button>
          }
        >
          <SessionTable rows={rows} />
        </Card>
        <Card title={active ? `Connect · ${active.name}` : "Connect a device"}>
          {active ? (
            <>
              <div className="grid place-items-center rounded-2xl border border-border p-4">
                <QrPattern seed={active.name + active.number} />
              </div>
              <ol className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li>1. Open WhatsApp on your phone.</li>
                <li>2. Go to Settings → Linked devices.</li>
                <li>3. Scan this QR code to link the session.</li>
              </ol>
              {connected ? (
                <p className="mt-4 font-mono text-[11px] text-primary">
                  ● session connected
                </p>
              ) : (
                <button
                  onClick={markConnected}
                  className="mt-4 w-full rounded-full border border-border px-3 py-2 text-xs font-semibold hover:bg-surface"
                >
                  I have scanned it
                </button>
              )}
            </>
          ) : (
            <>
              <div className="grid place-items-center rounded-2xl border border-dashed border-border p-8">
                <QrCode className="size-24 text-primary" />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Create a new session to generate a QR code.
              </p>
            </>
          )}
        </Card>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm">
          <form
            onSubmit={create}
            className="glass-card w-full max-w-sm rounded-2xl p-6"
          >
            <h3 className="font-display text-base font-bold">New session</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Give the session a name and the WhatsApp number you want to link.
            </p>

            <label className="mt-5 block text-xs text-muted-foreground">Session name</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="support-02"
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3 py-2 font-mono text-sm outline-none focus:border-primary"
            />

            <label className="mt-4 block text-xs text-muted-foreground">
              WhatsApp number (optional)
            </label>
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="+880 1700-000000"
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3 py-2 font-mono text-sm outline-none focus:border-primary"
            />

            {error && <p className="mt-3 text-xs text-destructive">{error}</p>}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border border-border px-3 py-2 text-xs font-semibold hover:bg-surface"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="glow-ring flex-1 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}


function Messages() {
  return (
    <Card title="Message log">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground">
              <th className="pb-2 font-normal">To</th>
              <th className="pb-2 font-normal">Content</th>
              <th className="pb-2 font-normal">Type</th>
              <th className="pb-2 text-right font-normal">Sent</th>
            </tr>
          </thead>
          <tbody>
            {activity.concat(activity).map((a, i) => (
              <tr key={i} className="border-t border-border/60">
                <td className="py-3 font-mono text-xs">{a.to}</td>
                <td className="max-w-xs truncate py-3 text-muted-foreground">{a.text}</td>
                <td className="py-3 font-mono text-[11px] text-primary">{a.kind}</td>
                <td className="py-3 text-right font-mono text-[11px] text-muted-foreground">
                  {a.time} ago
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function AiReplies() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="AI assistant">
        <label className="block text-xs text-muted-foreground">System prompt</label>
        <textarea
          rows={6}
          defaultValue="You are SafeWachat support. Reply in the customer's language, keep answers under 3 sentences, and never share internal pricing."
          className="mt-1.5 w-full rounded-xl border border-input bg-surface p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Reply delay</p>
            <p className="mt-1 font-mono text-sm">0.6s</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Fallback to human</p>
            <p className="mt-1 font-mono text-sm">after 2 unknowns</p>
          </div>
        </div>
        <button className="glow-ring mt-5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
          Save assistant
        </button>
      </Card>
      <Card title="Performance">
        <div className="space-y-4">
          {[
            { label: "Auto-resolved", value: 68 },
            { label: "Handed to human", value: 22 },
            { label: "No match", value: 10 },
          ].map((r) => (
            <div key={r.label}>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{r.label}</span>
                <span className="font-mono">{r.value}%</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface">
                <div className="h-full rounded-full bg-primary" style={{ width: `${r.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

const webhookEvents = [
  { id: "message.received", label: "Message received", desc: "Any inbound message on a session." },
  { id: "message.sent", label: "Message sent", desc: "Outbound message accepted by WhatsApp." },
  { id: "message.delivered", label: "Message delivered", desc: "Double tick on the customer side." },
  { id: "message.read", label: "Message read", desc: "Blue tick / message opened." },
  { id: "message.failed", label: "Message failed", desc: "Delivery rejected or expired." },
  { id: "media.received", label: "Media received", desc: "Image, audio, video or document." },
  { id: "ai.reply.sent", label: "AI reply sent", desc: "Automated answer generated by SafeWachat." },
  { id: "ai.handover", label: "AI handover", desc: "Chat handed over to a human agent." },
  { id: "session.connected", label: "Session connected", desc: "Device linked successfully." },
  { id: "session.disconnected", label: "Session disconnected", desc: "Device logged out or lost." },
  { id: "session.qr", label: "QR refreshed", desc: "New QR code generated for pairing." },
  { id: "contact.updated", label: "Contact updated", desc: "Name or profile photo changed." },
  { id: "group.event", label: "Group event", desc: "Join, leave or subject change in a group." },
];

type Endpoint = { url: string; events: string[]; status: string };

function Webhooks() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([
    {
      url: "https://your.app/hooks/safewachat",
      events: ["message.received", "session.connected"],
      status: "connected",
    },
    { url: "https://crm.your.app/whatsapp", events: ["message.sent"], status: "connected" },
  ]);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [selected, setSelected] = useState<string[]>(["message.received", "message.sent"]);
  const [error, setError] = useState("");
  const [enabled, setEnabled] = useState<string[]>([
    "message.received",
    "message.sent",
    "session.connected",
  ]);

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  }

  function toggleEnabled(id: string) {
    setEnabled((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  }

  function connect(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!/^https?:\/\/.+/.test(trimmed)) return setError("Enter a valid https:// URL.");
    if (selected.length === 0) return setError("Select at least one event.");
    setEndpoints((prev) => [{ url: trimmed, events: selected, status: "connected" }, ...prev]);
    setOpen(false);
    setUrl("");
    setError("");
  }

  return (
    <>
      <div className="space-y-6">
        <Card
          title="Webhook endpoints"
          action={
            <button
              onClick={() => {
                setOpen(true);
                setError("");
              }}
              className="glow-ring rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground"
            >
              Connect webhook
            </button>
          }
        >
          <div className="space-y-3">
            {endpoints.map((ep) => (
              <div
                key={ep.url}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-border/60 px-4 py-3"
              >
                <code className="font-mono text-xs">{ep.url}</code>
                <StatusPill status={ep.status} />
                <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                  {enabled.length > 0 ? enabled.join(" · ") : "no events enabled"}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Failed deliveries retry after 10 seconds, 1 minute and 10 minutes. See the{" "}
            <Link to="/docs" className="text-primary hover:underline">
              webhook docs
            </Link>
            .
          </p>
        </Card>

        <Card
          title="Events you can subscribe to"
          action={
            <span className="font-mono text-[11px] text-muted-foreground">
              {enabled.length} of {webhookEvents.length} on
            </span>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {webhookEvents.map((ev) => {
              const on = enabled.includes(ev.id);
              return (
                <div
                  key={ev.id}
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    on ? "border-primary/50 bg-primary/5" : "border-border/60"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] text-primary">{ev.id}</p>
                    <p className="mt-1 text-sm">{ev.label}</p>
                    <p className="text-xs text-muted-foreground">{ev.desc}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={`${on ? "Disable" : "Enable"} ${ev.label}`}
                    onClick={() => toggleEnabled(ev.id)}
                    className={`mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full px-0.5 transition-colors ${
                      on ? "justify-end bg-primary" : "justify-start bg-border"
                    }`}
                  >
                    <span className="size-4 rounded-full bg-white shadow" />
                  </button>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Switched-on events are pushed to every connected endpoint above.
          </p>
        </Card>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm">
          <form
            onSubmit={connect}
            className="glass-card max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6"
          >
            <h3 className="font-display text-base font-bold">Connect webhook</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              We POST a signed JSON payload to your URL for every selected event.
            </p>

            <label className="mt-5 block text-xs text-muted-foreground">Endpoint URL</label>
            <input
              autoFocus
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your.app/hooks/safewachat"
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3 py-2 font-mono text-sm outline-none focus:border-primary"
            />

            <p className="mt-5 text-xs text-muted-foreground">Events</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {webhookEvents.map((ev) => {
                const on = selected.includes(ev.id);
                return (
                  <button
                    type="button"
                    key={ev.id}
                    onClick={() => toggle(ev.id)}
                    className={`rounded-xl border px-3 py-2 text-left transition-colors ${
                      on ? "border-primary bg-primary/10" : "border-border/60 hover:bg-surface"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-xs font-semibold">
                      <span
                        className={`grid size-3.5 place-items-center rounded-[4px] border ${
                          on ? "border-primary bg-primary" : "border-border"
                        }`}
                      />
                      {ev.label}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] text-muted-foreground">
                      {ev.id}
                    </span>
                  </button>
                );
              })}
            </div>

            {error && <p className="mt-3 text-xs text-destructive">{error}</p>}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border border-border px-3 py-2 text-xs font-semibold hover:bg-surface"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="glow-ring flex-1 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
              >
                Connect webhook
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}


function ApiKeys() {
  return (
    <Card
      title="API keys"
      action={
        <button className="glow-ring rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground">
          Create key
        </button>
      }
    >
      <div className="space-y-3">
        {[
          { name: "production", key: "sk_live_9f3k••••••••21ab", used: "2 minutes ago" },
          { name: "staging", key: "sk_test_04ma••••••••77cd", used: "3 days ago" },
        ].map((k) => (
          <div
            key={k.name}
            className="flex flex-wrap items-center gap-3 rounded-xl border border-border/60 px-4 py-3"
          >
            <span className="font-display text-sm font-bold">{k.name}</span>
            <code className="font-mono text-xs text-muted-foreground">{k.key}</code>
            <span className="ml-auto font-mono text-[11px] text-muted-foreground">
              last used {k.used}
            </span>
            <button className="rounded-md px-2 py-1 text-muted-foreground hover:bg-surface hover:text-foreground">
              <Copy className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Send your key as <code className="font-mono">Authorization: Bearer &lt;key&gt;</code> to
        <code className="ml-1 font-mono">https://api.safewachat.online</code>.
      </p>
    </Card>
  );
}

function SettingsPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="Workspace">
        <div className="space-y-4">
          <Field label="Workspace name" defaultValue="SafeWachat Production" />
          <Field label="Contact email" defaultValue="team@safewachat.online" />
          <Field label="Default session" defaultValue="support-01" />
          <button className="glow-ring rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
            Save changes
          </button>
        </div>
      </Card>
      <Card title="Danger zone">
        <p className="text-xs text-muted-foreground">
          Disconnecting all sessions logs every linked phone out of SafeWachat. You will need to scan
          the QR codes again.
        </p>
        <button className="mt-4 rounded-full border border-destructive px-4 py-2 text-xs font-semibold text-destructive">
          Disconnect all sessions
        </button>
      </Card>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-xl border border-input bg-surface px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
