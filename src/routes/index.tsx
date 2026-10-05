import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { About, Distributor, Footer, Hero, Products } from "@/components/site/Sections";
import { ContactForm } from "@/components/site/ContactForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "D Dynamic Soda — Feel the Punch" },
      { name: "description", content: "Bold flavoured drinks and sparkling soda: Lime, Orange, Cola, Grape, Mango and Original Soda. Enquire or become a distributor." },
      { property: "og:title", content: "D Dynamic Soda — Feel the Punch" },
      { property: "og:description", content: "Bold flavours and sparkling refreshment. Explore six drinks or partner with us as a distributor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a href="#products" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] btn-gold">Skip to products</a>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <About />
        <Distributor />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
