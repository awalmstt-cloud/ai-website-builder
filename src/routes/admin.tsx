import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Ban,
  BarChart3,
  Check,
  Clock,
  LogOut,
  MessageSquareDot,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  Users,
  Wallet,
  X,
} from "lucide-react";


export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Control Center — SafeWachat" },
      {
        name: "description",
        content:
          "Approve paid signups, track plan usage, block accounts and manage moderators from the SafeWachat admin control center.",
      },
      { property: "og:title", content: "Admin Control Center — SafeWachat" },
      {
        property: "og:description",
        content: "Client plans, payment approvals, usage analytics and moderator access in one panel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPage,
});

const nav = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "clients", label: "Clients", icon: Users },
  { id: "approvals", label: "Payments & Approvals", icon: Wallet },
  { id: "moderators", label: "Moderators", icon: ShieldCheck },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type TabId = (typeof nav)[number]["id"];
type Status = "active" | "pending" | "blocked" | "rejected";

type Client = {
  id: string;
  name: string;
  email: string;
  plan: "Starter" | "Growth" | "Scale";
  amountUsd: number;
  amountBdt: number;
  currency: "USD" | "BDT";
  txn: string;
  method: string;
  used: number;
  quota: number;
  status: Status;
  joined: string;
};

const initialClients: Client[] = [
  {
    id: "c1",
    name: "Maya's Boutique",
    email: "maya@boutique.com",
    plan: "Growth",
    amountUsd: 14.99,
    amountBdt: 1499,
    currency: "BDT",
    txn: "BKS7X2QM19",
    method: "bKash",
    used: 48213,
    quota: 100000,
    status: "active",
    joined: "12 Aug 2026",
  },
  {
    id: "c2",
    name: "Nexa Retail",
    email: "ops@nexaretail.io",
    plan: "Scale",
    amountUsd: 49.99,
    amountBdt: 4999,
    currency: "USD",
    txn: "0x9fa31c8bd7",
    method: "USDT (TRC20)",
    used: 312904,
    quota: 500000,
    status: "active",
    joined: "02 Jul 2026",
  },
  {
    id: "c3",
    name: "Dr. Rahman Clinic",
    email: "front@rahmanclinic.bd",
    plan: "Starter",
    amountUsd: 4.99,
    amountBdt: 499,
    currency: "BDT",
    txn: "NGD41K88Z0",
    method: "Nagad",
    used: 6120,
    quota: 10000,
    status: "pending",
    joined: "27 Aug 2026",
  },
  {
    id: "c4",
    name: "Trailhead Studio",
    email: "hi@trailhead.co",
    plan: "Growth",
    amountUsd: 14.99,
    amountBdt: 1499,
    currency: "USD",
    txn: "0x71bb0ce442",
    method: "USDT (BEP20)",
    used: 0,
    quota: 100000,
    status: "pending",
    joined: "28 Aug 2026",
  },
  {
    id: "c5",
    name: "Bolt Logistics",
    email: "tech@boltlog.com",
    plan: "Scale",
    amountUsd: 49.99,
    amountBdt: 4999,
    currency: "USD",
    txn: "0x2ad9f0be31",
    method: "USDT (TRC20)",
    used: 0,
    quota: 500000,
    status: "pending",
    joined: "28 Aug 2026",
  },
  {
    id: "c6",
    name: "Spam Sender Ltd",
    email: "bulk@spamsender.xyz",
    plan: "Starter",
    amountUsd: 4.99,
    amountBdt: 499,
    currency: "BDT",
    txn: "RKT90PP221",
    method: "Rocket",
    used: 9980,
    quota: 10000,
    status: "blocked",
    joined: "19 Jun 2026",
  },
];

const revenue = [12, 18, 15, 26, 31, 28, 40, 47, 44, 58, 63, 71];
const signups = [4, 6, 5, 9, 11, 8, 14, 17, 15, 21, 24, 27];
const months = ["S", "O", "N", "D", "J", "F", "M", "A", "M", "J", "J", "A"];

const statusStyles: Record<Status, string> = {
  active: "bg-primary/15 text-primary",
  pending: "bg-accent/15 text-accent",
  blocked: "bg-destructive/15 text-destructive",
  rejected: "bg-muted/20 text-muted-foreground",
};

function AdminPage() {
  const [tab, setTab] = useState<TabId>("overview");
  const [clients, setClients] = useState<Client[]>(initialClients);

  const setStatus = (id: string, status: Status) =>
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />

      <div className="relative mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-6">
        <aside className="glass-card sticky top-6 hidden h-[calc(100vh-3rem)] w-60 shrink-0 flex-col rounded-3xl p-4 md:flex">
          <Link to="/" className="mb-6 flex items-center gap-2 px-2 font-display text-sm font-bold">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <MessageSquareDot className="size-4" />
            </span>
            SafeWachat
          </Link>
          <p className="mb-2 px-3 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            Control center
          </p>

          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  tab === item.id
                    ? "bg-surface text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </button>
            ))}
            <Link
              to="/dashboard"
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <BadgeCheck className="size-4" /> Client dashboard
            </Link>
          </nav>

          <div className="mt-auto">
            <Link
              to="/login"
              className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut className="size-4" /> Log out
            </Link>
          </div>
        </aside>

        <main className="min-w-0 flex-1 space-y-6">
          <header className="glass-card flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3">
            <div>
              <h1 className="font-display text-lg font-bold">
                {nav.find((n) => n.id === tab)?.label}
              </h1>
              <p className="text-xs text-muted-foreground">
                admin.safewachat.online · owner access
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="glass-card inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
                <span className="size-2 rounded-full bg-accent" />
                {clients.filter((c) => c.status === "pending").length} pending
              </span>
              <span className="grid size-9 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                A
              </span>
            </div>
          </header>

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

          {tab === "overview" && <Overview clients={clients} />}
          {tab === "clients" && <Clients clients={clients} setStatus={setStatus} />}
          {tab === "approvals" && <Approvals clients={clients} setStatus={setStatus} />}
          {tab === "moderators" && <Moderators />}
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
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="font-display text-sm font-semibold">{title}</h2>
        <div className="ml-auto">{action}</div>
      </div>
      {children}
    </section>
  );
}

function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function Overview({ clients }: { clients: Client[] }) {
  const count = (s: Status) => clients.filter((c) => c.status === s).length;
  const mrr = clients
    .filter((c) => c.status === "active")
    .reduce((sum, c) => sum + c.amountUsd, 0);

  const stats = [
    { label: "Total clients", value: String(clients.length), delta: "+3 this week" },
    { label: "Approved", value: String(count("active")), delta: "paying now" },
    { label: "Pending approval", value: String(count("pending")), delta: "needs review" },
    { label: "Blocked / rejected", value: String(count("blocked") + count("rejected")), delta: "restricted" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-5">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-mono text-3xl font-bold text-foreground">{s.value}</p>
            <p className="mt-1 text-xs text-primary">{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card
          title="Revenue (USD, last 12 months)"
          action={
            <span className="font-mono text-xs text-primary">
              ${mrr.toFixed(2)} MRR
            </span>
          }
        >
          <div className="flex h-48 items-end gap-2">
            {revenue.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-primary/70 transition-all hover:bg-primary"
                  style={{ height: `${(v / 80) * 100}%` }}
                />
                <span className="font-mono text-[10px] text-muted-foreground">{months[i]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="New signups">
          <div className="flex h-48 items-end gap-1.5">
            {signups.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-accent/60"
                  style={{ height: `${(v / 30) * 100}%` }}
                />
                <span className="font-mono text-[10px] text-muted-foreground">{months[i]}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Plan distribution">
        <div className="space-y-4">
          {(["Starter", "Growth", "Scale"] as const).map((plan) => {
            const list = clients.filter((c) => c.plan === plan);
            const pct = Math.round((list.length / clients.length) * 100);
            return (
              <div key={plan}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground">{plan}</span>
                  <span className="font-mono text-muted-foreground">
                    {list.length} clients · {pct}%
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function UsageBar({ used, quota }: { used: number; quota: number }) {
  const pct = Math.min(100, Math.round((used / quota) * 100));
  return (
    <div className="min-w-32">
      <p className="font-mono text-[11px] text-muted-foreground">
        {used.toLocaleString()} / {quota.toLocaleString()}
      </p>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">
        <div
          className={`h-full rounded-full ${pct > 90 ? "bg-destructive" : "bg-primary"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Clients({
  clients,
  setStatus,
}: {
  clients: Client[];
  setStatus: (id: string, status: Status) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Status>("all");

  const rows = useMemo(
    () =>
      clients.filter(
        (c) =>
          (filter === "all" || c.status === filter) &&
          (c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.email.toLowerCase().includes(query.toLowerCase()) ||
            c.txn.toLowerCase().includes(query.toLowerCase())),
      ),
    [clients, query, filter],
  );

  return (
    <Card
      title="All clients"
      action={
        <div className="flex flex-wrap items-center gap-2">
          <label className="glass-card inline-flex items-center gap-2 rounded-full px-3 py-1.5">
            <Search className="size-3.5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, txn"
              className="w-44 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
            />
          </label>
          {(["all", "active", "pending", "blocked", "rejected"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-[11px] capitalize transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "glass-card text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[840px] text-sm">
          <thead>
            <tr className="text-left font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
              <th className="pb-3">Client</th>
              <th className="pb-3">Plan</th>
              <th className="pb-3">Usage</th>
              <th className="pb-3">Paid</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((c) => (
              <tr key={c.id} className="align-middle">
                <td className="py-3">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.email}</p>
                </td>
                <td className="py-3">
                  <p>{c.plan}</p>
                  <p className="text-xs text-muted-foreground">joined {c.joined}</p>
                </td>
                <td className="py-3">
                  <UsageBar used={c.used} quota={c.quota} />
                </td>
                <td className="py-3 font-mono text-xs">
                  {c.currency === "USD" ? `$${c.amountUsd.toFixed(2)}` : `৳${c.amountBdt}`}
                  <p className="text-[11px] text-muted-foreground">{c.method}</p>
                </td>
                <td className="py-3">
                  <StatusPill status={c.status} />
                </td>
                <td className="py-3">
                  <div className="flex justify-end gap-2">
                    {c.status !== "active" && (
                      <button
                        type="button"
                        onClick={() => setStatus(c.id, "active")}
                        className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground"
                      >
                        Approve
                      </button>
                    )}
                    {c.status !== "blocked" ? (
                      <button
                        type="button"
                        onClick={() => setStatus(c.id, "blocked")}
                        className="glass-card inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] text-destructive"
                      >
                        <Ban className="size-3" /> Block
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setStatus(c.id, "active")}
                        className="glass-card rounded-full px-3 py-1.5 text-[11px] text-muted-foreground"
                      >
                        Unblock
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                  No clients match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Approvals({
  clients,
  setStatus,
}: {
  clients: Client[];
  setStatus: (id: string, status: Status) => void;
}) {
  const pending = clients.filter((c) => c.status === "pending");
  const decided = clients.filter((c) => c.status === "active" || c.status === "rejected");

  return (
    <div className="space-y-6">
      <Card
        title="Waiting for approval"
        action={
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-accent">
            <Clock className="size-3.5" /> {pending.length} in queue
          </span>
        }
      >
        {pending.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Nothing pending. Every payment has been reviewed.
          </p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {pending.map((c) => (
              <div key={c.id} className="glass-card rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{c.email}</p>
                  </div>
                  <span className="ml-auto rounded-full bg-surface px-2 py-0.5 text-[11px]">
                    {c.plan}
                  </span>
                </div>

                <dl className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Amount</dt>
                    <dd className="font-mono">
                      {c.currency === "USD" ? `$${c.amountUsd.toFixed(2)}` : `৳${c.amountBdt}`}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Method</dt>
                    <dd>{c.method}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Transaction ID</dt>
                    <dd className="truncate font-mono text-primary">{c.txn}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Submitted</dt>
                    <dd>{c.joined}</dd>
                  </div>
                </dl>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus(c.id, "active")}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    <Check className="size-3.5" /> Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(c.id, "rejected")}
                    className="glass-card inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-destructive"
                  >
                    <X className="size-3.5" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card title="Recently reviewed">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="text-left font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                <th className="pb-3">Client</th>
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {decided.map((c) => (
                <tr key={c.id}>
                  <td className="py-3">{c.name}</td>
                  <td className="py-3 font-mono text-xs text-muted-foreground">{c.txn}</td>
                  <td className="py-3 font-mono text-xs">
                    {c.currency === "USD" ? `$${c.amountUsd.toFixed(2)}` : `৳${c.amountBdt}`}
                  </td>
                  <td className="py-3">
                    <StatusPill status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

type Moderator = { email: string; role: "Moderator" | "Support" | "Owner"; added: string };

function Moderators() {
  const [team, setTeam] = useState<Moderator[]>([
    { email: "owner@safewachat.online", role: "Owner", added: "01 Jun 2026" },
    { email: "sadia@safewachat.online", role: "Moderator", added: "14 Jul 2026" },
  ]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Moderator["role"]>("Moderator");
  const [error, setError] = useState("");

  const invite = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setTeam((prev) => [...prev, { email, role, added: "Just now" }]);
    setEmail("");
    setError("");
  };

  return (
    <div className="space-y-6">
      <Card title="Invite a moderator">
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex-1 text-xs">
            <span className="text-muted-foreground">Email address</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="text-xs">
            <span className="text-muted-foreground">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Moderator["role"])}
              className="mt-1.5 w-40 rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            >
              <option value="Moderator">Moderator</option>
              <option value="Support">Support</option>
            </select>
          </label>
          <button
            type="button"
            onClick={invite}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Send invite
          </button>
        </div>
        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
        <p className="mt-3 text-xs text-muted-foreground">
          Moderators can review payments and approve or reject clients. They cannot change billing
          plans or remove other admins.
        </p>
      </Card>

      <Card title="Team access">
        <ul className="divide-y divide-border">
          {team.map((m) => (
            <li key={m.email} className="flex flex-wrap items-center gap-3 py-3">
              <span className="grid size-9 place-items-center rounded-full bg-surface font-display text-sm font-bold">
                {m.email[0]?.toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm">{m.email}</p>
                <p className="text-xs text-muted-foreground">Added {m.added}</p>
              </div>
              <span className="ml-auto rounded-full bg-surface px-3 py-1 text-[11px]">
                {m.role}
              </span>
              {m.role !== "Owner" && (
                <button
                  type="button"
                  onClick={() => setTeam((prev) => prev.filter((x) => x.email !== m.email))}
                  className="glass-card inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] text-destructive"
                >
                  <Trash2 className="size-3" /> Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function SettingsPanel() {
  const [autoApprove, setAutoApprove] = useState(false);
  const [rate, setRate] = useState("100");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="Payment settings">
        <div className="space-y-4 text-sm">
          <label className="block text-xs">
            <span className="text-muted-foreground">USD → BDT rate used on the pricing page</span>
            <input
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
          <div className="flex items-center justify-between gap-3 rounded-xl bg-surface px-3 py-2.5">
            <div>
              <p className="text-sm">Auto-approve verified USDT payments</p>
              <p className="text-xs text-muted-foreground">
                On-chain transactions are matched by hash before activation.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAutoApprove((v) => !v)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                autoApprove ? "bg-primary" : "bg-border"
              }`}
              aria-pressed={autoApprove}
            >
              <span
                className={`absolute top-0.5 size-5 rounded-full bg-background transition-all ${
                  autoApprove ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </Card>

      <Card title="Payout channels">
        <ul className="space-y-3 text-sm">
          {[
            { label: "bKash (merchant)", value: "01700-000000" },
            { label: "Nagad", value: "01811-222333" },
            { label: "USDT TRC20", value: "TQn9Y2khE...s4Hf" },
            { label: "USDT BEP20", value: "0x71bb0c...e442" },
          ].map((p) => (
            <li key={p.label} className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">{p.label}</span>
              <span className="font-mono text-xs">{p.value}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
