import { useEffect, useRef, useState, type FormEvent } from "react";
import { contactSchema } from "@/lib/contact-schema";
import { PRODUCT_NAMES } from "@/data/products";
import { Reveal } from "./Reveal";

type Status = "idle" | "loading" | "success" | "error";
const empty = { name: "", email: "", phone: "", company: "", city: "", type: "General", product: "All Products", message: "", website: "" };

export function ContactForm() {
  const [v, setV] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const started = useRef(Date.now());

  useEffect(() => {
    const on = (e: Event) => {
      const { type, product } = (e as CustomEvent).detail;
      setV((s) => ({ ...s, type, product: product ?? (type === "Distributor" ? "All Products" : s.product) }));
      setStatus("idle");
    };
    window.addEventListener("dds:enquire", on);
    return () => window.removeEventListener("dds:enquire", on);
  }, []);

  const set = (k: keyof typeof empty) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    const payload = { ...v, startedAt: started.current };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fe = parsed.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(fe).map(([k, a]) => [k, (a as string[] | undefined)?.[0] ?? ""])) as Record<string, string>);
      document.getElementById(`cf-${Object.keys(fe)[0]}`)?.focus();
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/public/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) { setStatus("success"); setV(empty); started.current = Date.now(); }
      else {
        if (data.fields) setErrors(Object.fromEntries(Object.entries(data.fields as Record<string, string[]>).map(([k, a]) => [k, a[0] ?? ""])) as Record<string, string>);
        setStatus("error"); setMsg(data.error ?? "Something went wrong. Please try again.");
      }
    } catch { setStatus("error"); setMsg("Network error — please check your connection and try again."); }
  }

  const F = ({ id, label, req, children }: { id: string; label: string; req?: boolean; children: React.ReactNode }) => (
    <div>
      <label htmlFor={`cf-${id}`} className="mb-1.5 block text-sm font-semibold">{label}{req ? <span className="text-gold"> *</span> : <span className="text-muted-foreground font-normal"> (optional)</span>}</label>
      {children}
      {errors[id] && <p id={`cf-${id}-err`} role="alert" className="mt-1 text-sm text-destructive">{errors[id]}</p>}
    </div>
  );
  const a = (id: string) => ({ id: `cf-${id}`, "aria-invalid": !!errors[id], "aria-describedby": errors[id] ? `cf-${id}-err` : undefined, className: "field" });

  return (
    <section id="contact" className="border-t bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="eyebrow">Contact Us</p>
          <h2 className="mt-3 text-3xl font-semibold uppercase sm:text-5xl">Let's talk refreshment</h2>
          <p className="mt-4 text-muted-foreground">Questions about our drinks or stocking them? Send us a message.</p>
        </Reveal>
        <form onSubmit={submit} noValidate className="mt-12 grid gap-5 rounded-3xl border bg-card p-6 sm:grid-cols-2 sm:p-10">
          {F({ id: "name", label: "Full name", req: true, children: <input {...a("name")} autoComplete="name" value={v.name} onChange={set("name")} /> })}
          {F({ id: "email", label: "Email address", req: true, children: <input {...a("email")} type="email" autoComplete="email" value={v.email} onChange={set("email")} /> })}
          {F({ id: "phone", label: "Phone number", children: <input {...a("phone")} type="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} /> })}
          {F({ id: "company", label: "Company or shop name", children: <input {...a("company")} autoComplete="organization" value={v.company} onChange={set("company")} /> })}
          {F({ id: "city", label: "City or region", children: <input {...a("city")} value={v.city} onChange={set("city")} /> })}
          {F({ id: "type", label: "Enquiry type", req: true, children: (
            <select {...a("type")} value={v.type} onChange={set("type")}>
              <option value="General">General</option><option value="Product">Product</option><option value="Distributor">Distributor</option>
            </select>) })}
          <div className="sm:col-span-2">
            {F({ id: "product", label: "Interested product", req: true, children: (
              <select {...a("product")} value={v.product} onChange={set("product")}>
                {[...PRODUCT_NAMES, "All Products"].map((p) => <option key={p}>{p}</option>)}
              </select>) })}
          </div>
          <div className="sm:col-span-2">
            {F({ id: "message", label: "Message", req: true, children: <textarea {...a("message")} rows={5} value={v.message} onChange={set("message")} /> })}
          </div>
          <div aria-hidden className="absolute -left-[9999px]">
            <label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} /></label>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" disabled={status === "loading"} className="btn-gold w-full disabled:opacity-60 sm:w-auto">
              {status === "loading" ? "Sending…" : "Send Enquiry"}
            </button>
            <div aria-live="polite" className="mt-4 text-sm">
              {status === "success" && <p className="text-success">Thank you — your enquiry has been sent. We'll be in touch soon.</p>}
              {status === "error" && <p className="text-destructive">{msg}</p>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
