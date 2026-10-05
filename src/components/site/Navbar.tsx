import { useEffect, useRef, useState } from "react";
import logo from "@/assets/d-dynamic-soda-logo.png.asset.json";
import { navLinks, openEnquiry } from "@/data/products";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a,button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (e.key === "Tab") {
        const f = [toggleRef.current!, ...focusables()];
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1]?.focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0]?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`sticky top-0 z-50 transition-colors ${scrolled || open ? "bg-background/90 backdrop-blur-md border-b" : "bg-transparent"}`}>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
        <a href="#home" className="flex shrink-0 items-center gap-3" aria-label="D Dynamic Soda home">
          <img src={logo.url} alt="D Dynamic Soda logo" width={48} height={48} className="h-11 w-11 object-contain lg:h-12 lg:w-12" />
          <span className="font-display text-lg tracking-wide hidden sm:inline">D DYNAMIC SODA</span>
        </a>
        <ul className="hidden items-center gap-6 xl:flex">
          {navLinks.map((l) => (
            <li key={l.href}><a href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{l.label}</a></li>
          ))}
        </ul>
        <button onClick={() => openEnquiry("General")} className="btn-gold hidden xl:inline-flex">Enquire Now</button>
        <button
          ref={toggleRef}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative grid h-11 w-11 place-items-center rounded-full border xl:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className={`absolute h-0.5 w-5 bg-foreground transition-transform ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span aria-hidden className={`absolute h-0.5 w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span aria-hidden className={`absolute h-0.5 w-5 bg-foreground transition-transform ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
      </nav>

      <div className={`xl:hidden ${open ? "" : "pointer-events-none"}`}>
        <div onClick={close} aria-hidden className={`fixed inset-0 top-16 bg-background/70 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          hidden={!open && undefined}
          className={`fixed inset-x-0 top-16 border-b bg-surface px-6 pb-8 pt-4 transition-all duration-300 ${open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 invisible"}`}
        >
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} onClick={close} className="block border-b py-4 font-display text-xl">{l.label}</a></li>
            ))}
          </ul>
          <button onClick={() => { close(); openEnquiry("General"); }} className="btn-gold mt-6 w-full">Enquire Now</button>
        </div>
      </div>
    </header>
  );
}
