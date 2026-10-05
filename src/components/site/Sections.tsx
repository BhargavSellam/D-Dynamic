
import { company, navLinks, openEnquiry, products, type Product } from "@/data/products";
import { Bubbles, Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-10 sm:pt-16">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--gold)_16%,transparent),transparent_65%)]" />
      <Bubbles />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center hero-in">
          <p className="eyebrow">Feel the punch</p>
          <h1 className="mt-4 text-4xl font-semibold uppercase leading-[1.05] sm:text-6xl lg:text-7xl">
            Feel the Punch.<br /><span className="bg-[image:var(--gradient-gold)] bg-clip-text text-transparent">Taste the Refreshment.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Discover bold flavours and sparkling refreshment with D Dynamic Soda.
          </p>
        </div>
        <div className="hero-in mt-10 [animation-delay:200ms]">
          <img
            src="/assets/all-flavours.png"
            alt="Six D Dynamic Soda bottles in a row: Lime, Orange, Cola, Grape, Mango and Original Soda"
            width={1774}
            height={887}
            fetchPriority="high"
            className="mx-auto h-auto w-full max-w-6xl rounded-3xl object-contain"
          />
        </div>
        <div className="hero-in mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row [animation-delay:350ms]">
          <a href="#products" className="btn-gold w-full sm:w-auto">Explore Our Products</a>
          <a href="#distributor" className="btn-ghost w-full sm:w-auto">Become a Distributor</a>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <article
      style={{ ["--acc" as string]: p.accentVar }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-[color-mix(in_oklab,var(--acc)_60%,transparent)] hover:shadow-[0_24px_60px_-24px_var(--acc)] focus-within:border-[color-mix(in_oklab,var(--acc)_60%,transparent)]"
    >
      <div className="relative aspect-square bg-[radial-gradient(circle_at_50%_70%,color-mix(in_oklab,var(--acc)_18%,transparent),transparent_70%)]">
        {p.image ? (
          <img src={p.image} alt={`D Dynamic Soda ${p.name} 350ml bottle`} width={1254} height={1254} loading="lazy" className="h-full w-full object-contain" />
        ) : (
          <div className="grid h-full place-items-center p-8 text-center">
            <div>
              <div aria-hidden className="mx-auto h-40 w-14 rounded-t-[2rem] rounded-b-2xl border border-original/40 bg-original/10" />
              <p className="mt-4 text-sm text-muted-foreground">Bottle photo coming soon</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="h-1 w-10 rounded-full bg-[var(--acc)]" />
        <h3 className="mt-4 text-2xl font-semibold uppercase">{p.name}</h3>
        <p className="mt-2 flex-1 text-muted-foreground">{p.description}</p>
        <button onClick={() => openEnquiry("Product", p.name)} className="btn-ghost mt-6 border-[color-mix(in_oklab,var(--acc)_55%,transparent)]">
          Enquire About This Product
        </button>
      </div>
    </article>
  );
}

export function Products() {
  return (
    <section id="products" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Our Products</p>
          <h2 className="mt-3 text-3xl font-semibold uppercase sm:text-5xl">Discover Your Favourite Flavour</h2>
          <p className="mt-4 text-muted-foreground">From fruity favourites to classic soda, find your refreshing match.</p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 120}><ProductCard p={p} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  const points = [
    { t: "Flavour variety", d: "Six distinct drinks, from fruity favourites to a classic clear soda." },
    { t: "Sparkling refreshment", d: "Lively carbonation crafted to deliver that signature punch." },
    { t: "Made to share", d: "Drinks designed for stores, restaurants and every refreshing moment." },
  ];
  return (
    <section id="about" className="border-y bg-surface py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal className="flex justify-center">
          <img src="/assets/d-dynamic-soda-logo.png" alt="D Dynamic Soda emblem" width={482} height={482} loading="lazy" className="w-56 max-w-full rounded-full object-contain shadow-[var(--shadow-glow)] sm:w-72" />
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">About Us</p>
          <h2 className="mt-3 text-3xl font-semibold uppercase sm:text-5xl">Bold drinks, made to refresh</h2>
          <p className="mt-5 text-muted-foreground">
            D Dynamic Soda is a manufacturer of soda and flavoured beverages. We focus on bold flavour variety and
            refreshing experiences — bringing together fruity favourites and a classic sparkling soda under one name.
          </p>
          <ul className="mt-8 grid gap-5">
            {points.map((p) => (
              <li key={p.t} className="flex gap-4">
                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
                <div><h3 className="text-lg uppercase">{p.t}</h3><p className="text-sm text-muted-foreground">{p.d}</p></div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Distributor() {
  return (
    <section id="distributor" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-card p-8 text-center sm:p-14">
            <Bubbles count={8} />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_60%)]" />
            <div className="relative mx-auto max-w-2xl">
              <p className="eyebrow">Become a Distributor</p>
              <h2 className="mt-3 text-3xl font-semibold uppercase sm:text-5xl">Bring D Dynamic Soda to Your Store</h2>
              <p className="mt-5 text-muted-foreground">
                Retailers, wholesalers, distributors, restaurants and hospitality businesses are welcome to get in touch
                about stocking our beverages. Tell us about your business and we'll get back to you.
              </p>
              <button onClick={() => openEnquiry("Distributor")} className="btn-gold mt-8">Partner With Us</button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <img src="/assets/d-dynamic-soda-logo.png" alt="D Dynamic Soda logo" width={64} height={64} loading="lazy" className="h-16 w-16 object-contain" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">Bold flavoured drinks and sparkling soda. Feel the punch.</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm uppercase tracking-widest text-gold">Explore</h2>
          <ul className="mt-4 grid gap-2">
            {navLinks.map((l) => <li key={l.href}><a href={l.href} className="text-sm text-muted-foreground hover:text-foreground">{l.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm uppercase tracking-widest text-gold">Contact</h2>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
            {company.email && <li><a href={`mailto:${company.email}`} className="hover:text-foreground">{company.email}</a></li>}
            {company.phone && <li><a href={`tel:${company.phone}`} className="hover:text-foreground">{company.phone}</a></li>}
            {company.location && <li>{company.location}</li>}
            {company.socials.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer" className="hover:text-foreground">{s.label}</a></li>)}
            <li><a href="#contact" className="hover:text-foreground">Send us an enquiry</a></li>
          </ul>
        </div>
      </div>
      <p className="border-t py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} D Dynamic Soda. All rights reserved.</p>
    </footer>
  );
}
