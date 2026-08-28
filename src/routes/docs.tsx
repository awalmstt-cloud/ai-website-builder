import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Copy, Search } from "lucide-react";
import { AuroraBackground } from "@/components/AuroraBackground";
import { SiteNav } from "@/components/SiteNav";

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

// ---------- types ----------

type Param = { name: string; type: string; required: boolean; desc: string };

type Topic = {
  id: string;
  label: string;
  isNew?: boolean;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  desc: string;
  params?: Param[];
  snippets: { lang: string; code: string }[];
  success: string;
  error: string;
};

type Group = { title: string; topics: Topic[] };

const LANGS = ["cURL", "JavaScript", "Python"] as const;

const msgSnippet = (body: string, lang: (typeof LANGS)[number]) => {
  if (lang === "cURL")
    return `curl -X POST "https://api.safewa.dev/v1/messages" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${body}'`;
  if (lang === "JavaScript")
    return `const res = await fetch("https://api.safewa.dev/v1/messages", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.SAFEWA_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(${body}),
});
console.log(await res.json());`;
  return `import os, requests

res = requests.post(
    "https://api.safewa.dev/v1/messages",
    headers={"Authorization": f"Bearer {os.environ['SAFEWA_API_KEY']}"},
    json=${body},
)
print(res.json())`;
};

function messageTopic(
  id: string,
  label: string,
  typeField: string,
  extra: string,
  desc: string,
  params: Param[],
  isNew?: boolean,
): Topic {
  const body = `{
  "session": "default",
  "to": "+8801700000000",
  "type": "${typeField}"${extra}
}`;
  return {
    id,
    label,
    isNew,
    method: "POST",
    path: "/v1/messages",
    desc,
    params: [
      { name: "session", type: "string", required: true, desc: "Name of the connected session." },
      { name: "to", type: "string", required: true, desc: "Recipient number with country code." },
      ...params,
    ],
    snippets: LANGS.map((l) => ({ lang: l, code: msgSnippet(body, l) })),
    success: `{
  "success": true,
  "data": {
    "message_id": "msg_9f3ka21",
    "status": "queued"
  }
}`,
    error: `{
  "success": false,
  "error": {
    "code": "unauthorized",
    "message": "Invalid or missing API key"
  }
}`,
  };
}

const groups: Group[] = [
  {
    title: "Getting started",
    topics: [
      {
        id: "quickstart",
        label: "Quickstart",
        method: "POST",
        path: "/v1/messages",
        desc: "Send your first WhatsApp message in 3 steps: create an API key from the dashboard, link a session by scanning one QR code, then call the messages endpoint.",
        snippets: [
          {
            lang: "cURL",
            code: `curl -X POST "https://api.safewa.dev/v1/messages" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "session": "default",
    "to": "+8801700000000",
    "type": "text",
    "text": "Hello from SafeWA"
  }'`,
          },
          {
            lang: "JavaScript",
            code: `const res = await fetch("https://api.safewa.dev/v1/messages", {
  method: "POST",
  headers: { Authorization: \`Bearer \${process.env.SAFEWA_API_KEY}\` },
  body: JSON.stringify({
    session: "default",
    to: "+8801700000000",
    type: "text",
    text: "Hello from SafeWA",
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
        "text": "Hello from SafeWA",
    },
)
print(res.json())`,
          },
        ],
        success: `{
  "success": true,
  "data": {
    "message_id": "msg_9f3ka21",
    "status": "queued"
  }
}`,
        error: `{
  "success": false,
  "error": {
    "code": "session_not_found",
    "message": "No session named \\"default\\""
  }
}`,
      },
      {
        id: "authentication",
        label: "Authentication",
        method: "GET",
        path: "/v1/whoami",
        desc: "Every request needs your API key in the Authorization header. Test keys start with swa_test_ and live keys with swa_live_. Keep live keys on your own backend only — never in a browser or mobile app.",
        snippets: [
          {
            lang: "cURL",
            code: `curl "https://api.safewa.dev/v1/whoami" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
          },
          {
            lang: "JavaScript",
            code: `const res = await fetch("https://api.safewa.dev/v1/whoami", {
  headers: { Authorization: \`Bearer \${process.env.SAFEWA_API_KEY}\` },
});
console.log(await res.json());`,
          },
          {
            lang: "Python",
            code: `import os, requests

res = requests.get(
    "https://api.safewa.dev/v1/whoami",
    headers={"Authorization": f"Bearer {os.environ['SAFEWA_API_KEY']}"},
)
print(res.json())`,
          },
        ],
        success: `{
  "success": true,
  "data": {
    "workspace": "acme-shop",
    "plan": "growth"
  }
}`,
        error: `{
  "success": false,
  "error": {
    "code": "unauthorized",
    "message": "Invalid or missing API key"
  }
}`,
      },
      {
        id: "create-session",
        label: "Create Session (QR)",
        method: "POST",
        path: "/v1/sessions",
        desc: "One session equals one connected WhatsApp number. Create a session, fetch its QR code, and scan it from the WhatsApp app — the same flow as WhatsApp Web. The QR expires after 60 seconds.",
        params: [
          { name: "name", type: "string", required: true, desc: "A unique name for this session." },
          { name: "webhook", type: "string", required: false, desc: "URL that receives incoming messages and status events." },
        ],
        snippets: [
          {
            lang: "cURL",
            code: `curl -X POST "https://api.safewa.dev/v1/sessions" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{ "name": "support-01", "webhook": "https://your.app/hooks/safewa" }'

# then fetch the QR code
curl "https://api.safewa.dev/v1/sessions/support-01/qr" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
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

// then fetch the QR code
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

# then fetch the QR code
qr = requests.get(
    "https://api.safewa.dev/v1/sessions/support-01/qr",
    headers={"Authorization": f"Bearer {KEY}"},
).json()`,
          },
        ],
        success: `{
  "success": true,
  "data": {
    "qr": "data:image/png;base64,...",
    "expires_in": 60
  }
}`,
        error: `{
  "success": false,
  "error": {
    "code": "session_exists",
    "message": "A session with this name already exists"
  }
}`,
      },
    ],
  },
  {
    title: "Messages",
    topics: [
      messageTopic(
        "send-text",
        "Send Text Message",
        "text",
        `,
  "text": "Your order ships today"`,
        "Send a plain text message to any WhatsApp number. The message is queued instantly and you get a message_id back to track delivery.",
        [{ name: "text", type: "string", required: true, desc: "The message body, up to 4096 characters." }],
      ),
      messageTopic(
        "send-image",
        "Send Image Message",
        "image",
        `,
  "url": "https://cdn.you.com/look.png",
  "caption": "New drop"`,
        "Send an image from a public URL, with an optional caption. JPG, PNG and WEBP up to 16 MB are supported.",
        [
          { name: "url", type: "string", required: true, desc: "Public URL of the image file." },
          { name: "caption", type: "string", required: false, desc: "Text shown under the image." },
        ],
      ),
      messageTopic(
        "send-video",
        "Send Video Message",
        "video",
        `,
  "url": "https://cdn.you.com/promo.mp4",
  "caption": "Watch this"`,
        "Send a video from a public URL. MP4 up to 64 MB is recommended for reliable delivery on all devices.",
        [
          { name: "url", type: "string", required: true, desc: "Public URL of the video file." },
          { name: "caption", type: "string", required: false, desc: "Text shown under the video." },
        ],
      ),
      messageTopic(
        "send-document",
        "Send Document Message",
        "document",
        `,
  "url": "https://cdn.you.com/invoice.pdf",
  "filename": "invoice-1024.pdf"`,
        "Send any file as a document — PDF, spreadsheet, ZIP and more. The filename is what the recipient sees.",
        [
          { name: "url", type: "string", required: true, desc: "Public URL of the file." },
          { name: "filename", type: "string", required: true, desc: "Filename shown to the recipient." },
        ],
      ),
      messageTopic(
        "send-audio",
        "Send Audio Message",
        "audio",
        `,
  "url": "https://cdn.you.com/voice.ogg",
  "ptt": true`,
        "Send an audio file, or a voice note bubble when ptt is set to true. OGG/OPUS gives the native voice-note look.",
        [
          { name: "url", type: "string", required: true, desc: "Public URL of the audio file." },
          { name: "ptt", type: "boolean", required: false, desc: "Send as a push-to-talk voice note." },
        ],
      ),
      messageTopic(
        "send-location",
        "Send Location",
        "location",
        `,
  "lat": 23.8103,
  "lng": 90.4125,
  "name": "Pickup point",
  "address": "Dhaka"`,
        "Send a location pin with an optional name and address. Opens directly in the recipient's map app.",
        [
          { name: "lat", type: "number", required: true, desc: "Latitude of the location." },
          { name: "lng", type: "number", required: true, desc: "Longitude of the location." },
          { name: "name", type: "string", required: false, desc: "Title shown on the pin." },
          { name: "address", type: "string", required: false, desc: "Address shown under the title." },
        ],
      ),
      messageTopic(
        "send-poll",
        "Send Poll Message",
        "poll",
        `,
  "question": "Which color do you like?",
  "options": ["Black", "White", "Green"]`,
        "Send an interactive poll with up to 12 options. Votes arrive at your webhook as they happen.",
        [
          { name: "question", type: "string", required: true, desc: "The poll question." },
          { name: "options", type: "string[]", required: true, desc: "2 to 12 answer options." },
        ],
        true,
      ),
      {
        id: "delete-message",
        label: "Delete a Message",
        method: "DELETE",
        path: "/v1/messages/{message_id}",
        desc: "Delete a message you sent, for everyone in the chat. Works within the same time window as the WhatsApp app.",
        snippets: [
          {
            lang: "cURL",
            code: `curl -X DELETE "https://api.safewa.dev/v1/messages/msg_9f3ka21" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
          },
          {
            lang: "JavaScript",
            code: `await fetch("https://api.safewa.dev/v1/messages/msg_9f3ka21", {
  method: "DELETE",
  headers: { Authorization: \`Bearer \${KEY}\` },
});`,
          },
          {
            lang: "Python",
            code: `requests.delete(
    "https://api.safewa.dev/v1/messages/msg_9f3ka21",
    headers={"Authorization": f"Bearer {KEY}"},
)`,
          },
        ],
        success: `{
  "success": true,
  "data": { "deleted": true }
}`,
        error: `{
  "success": false,
  "error": {
    "code": "too_late",
    "message": "Message can no longer be deleted"
  }
}`,
      },
    ],
  },
  {
    title: "AI & automation",
    topics: [
      {
        id: "ai-replies",
        label: "AI Auto-Replies",
        isNew: true,
        method: "PATCH",
        path: "/v1/sessions/{name}",
        desc: "Turn on the AI layer for a session and it answers customers by itself, in their own language. Add a system prompt and knowledge text (product list, FAQ, prices) so replies stay accurate. When confidence is low, the chat is handed to a human.",
        params: [
          { name: "ai.enabled", type: "boolean", required: true, desc: "Switch AI auto-replies on or off." },
          { name: "ai.prompt", type: "string", required: false, desc: "Tone and behavior instructions for the AI." },
          { name: "ai.knowledge", type: "string", required: false, desc: "Facts the AI may use: prices, FAQ, policies." },
        ],
        snippets: [
          {
            lang: "cURL",
            code: `curl -X PATCH "https://api.safewa.dev/v1/sessions/support-01" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "ai": {
      "enabled": true,
      "prompt": "You are a helpful shop assistant. Reply in the customer'"'"'s language.",
      "knowledge": "Delivery inside Dhaka: 60 BDT, outside Dhaka: 120 BDT."
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
      enabled: true,
      prompt: "You are a helpful shop assistant.",
      knowledge: "Delivery inside Dhaka: 60 BDT, outside: 120 BDT.",
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
            "enabled": True,
            "prompt": "You are a helpful shop assistant.",
            "knowledge": "Delivery inside Dhaka: 60 BDT.",
        }
    },
)`,
          },
        ],
        success: `{
  "success": true,
  "data": {
    "session": "support-01",
    "ai": { "enabled": true }
  }
}`,
        error: `{
  "success": false,
  "error": {
    "code": "session_not_found",
    "message": "No session named \\"support-01\\""
  }
}`,
      },
      {
        id: "webhooks",
        label: "Webhooks",
        method: "POST",
        path: "your endpoint",
        desc: "SafeWA pushes events to your webhook URL as they happen: incoming messages, delivery status, and session connect or disconnect. Reply with any 2xx within 5 seconds, otherwise the event is retried with backoff. Every request is signed — verify the x-safewa-signature header with your webhook secret.",
        snippets: [
          {
            lang: "cURL",
            code: `# what SafeWA sends to your URL
curl -X POST "https://your.app/hooks/safewa" \\
  -H "x-safewa-signature: sha256=..." \\
  -d '{
    "event": "message.received",
    "session": "support-01",
    "data": {
      "from": "+8801700000000",
      "type": "text",
      "text": "Do you deliver to Chattogram?"
    }
  }'`,
          },
          {
            lang: "JavaScript",
            code: `// minimal receiver (Node / edge)
export async function POST(req: Request) {
  const event = await req.json();

  if (event.event === "message.received") {
    console.log(event.data.from, event.data.text);
  }
  return new Response("ok"); // any 2xx
}`,
          },
          {
            lang: "Python",
            code: `@app.post("/hooks/safewa")
def safewa_hook(event: dict):
    if event["event"] == "message.received":
        print(event["data"]["from"], event["data"]["text"])
    return {"ok": True}  # any 2xx`,
          },
        ],
        success: `// events you will receive
"message.received"   // new incoming message
"message.delivered"  // reached the phone
"message.read"       // seen by the customer
"session.connected"  // QR scan done
"session.disconnected"`,
        error: `// retry schedule when your URL fails
1st retry  after 10 seconds
2nd retry  after 1 minute
3rd retry  after 10 minutes
then the event is dropped`,
      },
      {
        id: "errors-limits",
        label: "Errors & Rate Limits",
        method: "GET",
        path: "applies to all endpoints",
        desc: "Every error returns the same shape: success false, a machine-readable code, and a human message. Growth plans include 60 requests per second per API key — when you hit the limit you get a 429 with a retry_after hint.",
        snippets: [
          {
            lang: "cURL",
            code: `# example error response (HTTP 429)
{
  "success": false,
  "error": {
    "code": "rate_limited",
    "message": "Too many requests",
    "retry_after": 2
  }
}`,
          },
          {
            lang: "JavaScript",
            code: `if (res.status === 429) {
  const { error } = await res.json();
  await new Promise((r) =>
    setTimeout(r, (error.retry_after ?? 1) * 1000)
  );
  // safe to retry now
}`,
          },
          {
            lang: "Python",
            code: `import time

if res.status_code == 429:
    err = res.json()["error"]
    time.sleep(err.get("retry_after", 1))
    # safe to retry now`,
          },
        ],
        success: `// common codes
"unauthorized"        // bad or missing API key
"session_not_found"   // wrong session name
"invalid_number"      // not on WhatsApp
"rate_limited"        // slow down, see retry_after`,
        error: `{
  "success": false,
  "error": {
    "code": "invalid_number",
    "message": "+8801700000000 is not on WhatsApp"
  }
}`,
      },
    ],
  },
];

const allTopics = groups.flatMap((g) => g.topics);

// ---------- small components ----------

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(text).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="ml-auto flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
    >
      <Copy className="size-3" /> {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CodeTabs({ snippets }: { snippets: { lang: string; code: string }[] }) {
  const [active, setActive] = useState(0);
  const current = snippets[active] ?? snippets[0];
  return (
    <div className="glass-card overflow-hidden rounded-xl">
      <div className="flex flex-wrap items-center gap-1 border-b border-border px-3 pt-2">
        {snippets.map((s, i) => (
          <button
            key={s.lang}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-t-md border-b-2 px-3 py-1.5 font-mono text-[11px] transition-colors ${
              i === active
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.lang}
          </button>
        ))}
        <CopyButton text={current?.code ?? ""} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-muted-foreground">
        <code>{current?.code}</code>
      </pre>
    </div>
  );
}

function ResponseTabs({ success, error }: { success: string; error: string }) {
  const [tab, setTab] = useState<"ok" | "err">("ok");
  const text = tab === "ok" ? success : error;
  return (
    <div className="glass-card overflow-hidden rounded-xl">
      <div className="flex flex-wrap items-center gap-4 border-b border-border px-3 pt-2">
        <button
          type="button"
          onClick={() => setTab("ok")}
          className={`flex items-center gap-2 border-b-2 px-2 py-1.5 text-xs transition-colors ${
            tab === "ok"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="size-2 rounded-full bg-primary" /> Success Response
        </button>
        <button
          type="button"
          onClick={() => setTab("err")}
          className={`flex items-center gap-2 border-b-2 px-2 py-1.5 text-xs transition-colors ${
            tab === "err"
              ? "border-destructive text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="size-2 rounded-full bg-destructive" /> Error Response
        </button>
        <CopyButton text={text} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-muted-foreground">
        <code>{text}</code>
      </pre>
    </div>
  );
}

// ---------- page ----------

function Docs() {
  const [activeId, setActiveId] = useState("quickstart");
  const [query, setQuery] = useState("");
  const topic = allTopics.find((t) => t.id === activeId) ?? allTopics[0];
  const idx = allTopics.findIndex((t) => t.id === topic?.id);
  const prev = idx > 0 ? allTopics[idx - 1] : undefined;
  const next = idx >= 0 && idx < allTopics.length - 1 ? allTopics[idx + 1] : undefined;
  const q = query.trim().toLowerCase();

  const methodColor =
    topic?.method === "GET"
      ? "text-primary"
      : topic?.method === "DELETE"
        ? "text-destructive"
        : "text-accent";

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <SiteNav />

      <div className="mx-auto flex max-w-7xl gap-8 px-6 pt-10 pb-16">
        {/* sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <p className="flex items-center gap-2 px-2 pb-3 font-display text-sm font-bold">
              <BookOpen className="size-4 text-primary" /> API documentation
            </p>
            <label className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
              <Search className="size-3.5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              />
            </label>
            {groups.map((g) => {
              const topics = q
                ? g.topics.filter((t) => t.label.toLowerCase().includes(q))
                : g.topics;
              if (topics.length === 0) return null;
              return (
                <div key={g.title} className="mb-4">
                  <p className="px-2 pb-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    {g.title}
                  </p>
                  <nav className="flex flex-col gap-0.5">
                    {topics.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setActiveId(t.id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors ${
                          t.id === topic?.id
                            ? "bg-primary font-semibold text-primary-foreground"
                            : "text-muted-foreground hover:bg-surface hover:text-foreground"
                        }`}
                      >
                        {t.label}
                        {t.isNew ? (
                          <span
                            className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-bold ${
                              t.id === topic?.id
                                ? "bg-primary-foreground/20 text-primary-foreground"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            New
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </nav>
                </div>
              );
            })}
          </div>
        </aside>

        {/* mobile topic picker */}
        <div className="min-w-0 flex-1">
          <select
            value={topic?.id}
            onChange={(e) => setActiveId(e.target.value)}
            className="mb-6 w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm lg:hidden"
          >
            {groups.map((g) => (
              <optgroup key={g.title} label={g.title}>
                {g.topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          {topic ? (
            <article key={topic.id}>
              {/* header */}
              <p className="font-mono text-xs tracking-widest text-primary uppercase">
                {groups.find((g) => g.topics.some((t) => t.id === topic.id))?.title}
              </p>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
                {topic.label}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {topic.desc}
              </p>

              <p className="glass-card mt-6 inline-flex items-center gap-3 rounded-lg px-4 py-2.5 font-mono text-xs">
                <span className={`font-bold ${methodColor}`}>{topic.method}</span>
                <span className="text-foreground">{topic.path}</span>
              </p>

              {/* parameters */}
              {topic.params && topic.params.length > 0 ? (
                <div className="mt-8">
                  <h2 className="font-display text-lg font-bold">Parameters</h2>
                  <div className="glass-card mt-3 overflow-hidden rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground">
                          <th className="px-4 py-2.5 font-medium">Field</th>
                          <th className="px-4 py-2.5 font-medium">Type</th>
                          <th className="px-4 py-2.5 font-medium">Required</th>
                          <th className="hidden px-4 py-2.5 font-medium sm:table-cell">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {topic.params.map((p) => (
                          <tr key={p.name} className="border-b border-border/50 last:border-0">
                            <td className="px-4 py-2.5 font-mono text-primary">{p.name}</td>
                            <td className="px-4 py-2.5 font-mono text-muted-foreground">{p.type}</td>
                            <td className="px-4 py-2.5 text-muted-foreground">
                              {p.required ? "Yes" : "No"}
                            </td>
                            <td className="hidden px-4 py-2.5 text-muted-foreground sm:table-cell">
                              {p.desc}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}

              {/* code examples */}
              <div className="mt-8">
                <h2 className="font-display text-lg font-bold">Code Examples</h2>
                <div className="mt-3">
                  <CodeTabs snippets={topic.snippets} />
                </div>
              </div>

              {/* response examples */}
              <div className="mt-8">
                <h2 className="font-display text-lg font-bold">Response Examples</h2>
                <div className="mt-3">
                  <ResponseTabs success={topic.success} error={topic.error} />
                </div>
              </div>

              {/* prev / next */}
              <div className="mt-12 grid gap-3 sm:grid-cols-2">
                {prev ? (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveId(prev.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="glass-card rounded-xl px-4 py-3 text-left transition-colors hover:border-primary/40"
                  >
                    <span className="font-mono text-[10px] text-muted-foreground">
                      ← Previous
                    </span>
                    <p className="mt-1 text-sm font-semibold text-foreground">{prev.label}</p>
                  </button>
                ) : (
                  <span />
                )}
                {next ? (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveId(next.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="glass-card rounded-xl px-4 py-3 text-right transition-colors hover:border-primary/40"
                  >
                    <span className="font-mono text-[10px] text-muted-foreground">Next →</span>
                    <p className="mt-1 text-sm font-semibold text-foreground">{next.label}</p>
                  </button>
                ) : null}
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </div>
  );
}
