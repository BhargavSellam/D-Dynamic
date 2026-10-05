import { createFileRoute } from "@tanstack/react-router";
import { contactSchema } from "@/lib/contact-schema";

const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0] ?? "anon";
        const now = Date.now();
        const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
        if (recent.length >= LIMIT) return json({ ok: false, error: "Too many enquiries. Please try again in a few minutes." }, 429);
        recent.push(now);
        hits.set(ip, recent);

        let body: unknown;
        try { body = await request.json(); } catch { return json({ ok: false, error: "Invalid request." }, 400); }
        const parsed = contactSchema.safeParse(body);
        if (!parsed.success) return json({ ok: false, error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors }, 400);
        const d = parsed.data;
        if (d.website || (d.startedAt && now - d.startedAt < 2500)) return json({ ok: true }); // silently drop bots

        const key = process.env["RESEND_API_KEY"];
        const to = process.env["CONTACT_TO_EMAIL"];
        const from = process.env["CONTACT_FROM_EMAIL"] ?? "D Dynamic Soda <onboarding@resend.dev>";
        if (!key || !to) {
          return json({ ok: false, error: "Our enquiry email isn't set up yet, so your message could not be sent. Please try again later." }, 503);
        }
        const rows = [["Name", d.name], ["Email", d.email], ["Phone", d.phone], ["Company", d.company], ["City / region", d.city], ["Enquiry type", d.type], ["Product", d.product]]
          .filter(([, v]) => v).map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(String(v))}</td></tr>`).join("");
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from, to: to.split(",").map((s) => s.trim()), reply_to: d.email,
            subject: `${d.type} enquiry from ${d.name}`,
            html: `<table>${rows}</table><p>${esc(d.message).replace(/\n/g, "<br>")}</p>`,
          }),
        });
        if (!res.ok) return json({ ok: false, error: "We couldn't send your message right now. Please try again shortly." }, 502);
        return json({ ok: true });
      },
    },
  },
});
