import { useEffect, useState } from "react";
import dressImg from "@/assets/dress.jpg";

type Msg =
  | { from: "them" | "us"; kind: "text"; text: string; time: string }
  | { from: "them" | "us"; kind: "image"; caption: string; time: string };

const script: Msg[] = [
  { from: "them", kind: "text", text: "Hi! Is this dress still available?", time: "10:21" },
  { from: "them", kind: "image", caption: "Saw this on your page 😍", time: "10:21" },
  { from: "them", kind: "text", text: "What is the price?", time: "10:21" },
  {
    from: "us",
    kind: "text",
    text: "Yes, it's in stock 💚 The blue kurti is $24.90 — free delivery over $40.",
    time: "10:22",
  },
  { from: "them", kind: "text", text: "Great, I'll take one in medium.", time: "10:22" },
  {
    from: "us",
    kind: "text",
    text: "Reserved for 24h. Order #4182 — payment link is on its way here.",
    time: "10:22",
  },
];

export function WhatsAppChatDemo() {
  const [count, setCount] = useState(1);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const step = () => {
      if (cancelled) return;
      const next = count % script.length;
      const upcoming = script[next];
      if (count >= script.length) {
        timers.push(
          setTimeout(() => {
            if (!cancelled) setCount(1);
          }, 3200),
        );
        return;
      }
      if (upcoming?.from === "us") {
        setTyping(true);
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            setTyping(false);
            setCount((c) => c + 1);
          }, 1600),
        );
      } else {
        timers.push(
          setTimeout(() => {
            if (!cancelled) setCount((c) => c + 1);
          }, 1400),
        );
      }
    };

    step();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [count]);

  const visible = script.slice(0, count);

  return (
    <div
      className="flex h-[360px] flex-col justify-end gap-2 overflow-hidden px-3 py-4 text-[13px] leading-snug"
      style={{
        backgroundColor: "#0b141a",
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
        backgroundSize: "18px 18px",
      }}
    >
      <p className="mx-auto w-fit rounded-md bg-[#182229] px-2 py-1 text-[10px] text-white/50">
        Today
      </p>

      {visible.map((m, i) => {
        const mine = m.from === "us";
        return (
          <div
            key={i}
            className={`rise-in max-w-[85%] rounded-lg px-2.5 py-1.5 shadow ${
              mine
                ? "ml-auto rounded-tr-none bg-[#005c4b] text-white"
                : "rounded-tl-none bg-[#202c33] text-white/90"
            }`}
          >
            {m.kind === "image" ? (
              <>
                <img
                  src={dressImg}
                  alt="Blue kurti dress shared by the customer"
                  loading="lazy"
                  className="mb-1.5 h-40 w-40 rounded-md object-cover object-top"
                />
                {m.caption}
              </>
            ) : (
              m.text
            )}
            <span
              className={`mt-0.5 flex items-center justify-end gap-1 text-[10px] ${
                mine ? "text-white/50" : "text-white/40"
              }`}
            >
              {m.time}
              {mine && <span className="text-[#53bdeb]">✓✓</span>}
            </span>
          </div>
        );
      })}

      {typing && (
        <div className="flex w-fit items-center gap-1 rounded-lg rounded-tl-none bg-[#202c33] px-3 py-2">
          <span className="size-1.5 animate-bounce rounded-full bg-white/50" />
          <span className="size-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:150ms]" />
          <span className="size-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:300ms]" />
        </div>
      )}
    </div>
  );
}
