

export const PRODUCT_NAMES = ["Lime", "Orange", "Cola", "Grape", "Mango", "Original Soda"] as const;
export type ProductName = (typeof PRODUCT_NAMES)[number];

export type Product = {
  name: ProductName;
  description: string;
  /** null = individual photo not yet supplied */
  image: string | null;
  /** Tailwind token name, e.g. "lime" -> text-lime / bg-lime */
  accent: string;
  accentVar: string;
};

export const products: Product[] = [
  {
    name: "Lime",
    description: "A lively citrus twist with a crisp, refreshing finish.",
    image: "/assets/lime.png",
    accent: "lime",
    accentVar: "var(--flavour-lime)",
  },
  {
    name: "Orange",
    description: "Bright orange flavour with a bold, bubbly punch.",
    image: "/assets/orange.png",
    accent: "orange",
    accentVar: "var(--flavour-orange)",
  },
  {
    name: "Cola",
    description: "Classic cola character with a refreshing sparkle.",
    image: "/assets/cola.png?v=2",
    accent: "cola",
    accentVar: "var(--flavour-cola)",
  },
  {
    name: "Grape",
    description: "Rich, fruity grape flavour with an exciting fizz.",
    image: "/assets/grape.png",
    accent: "grape",
    accentVar: "var(--flavour-grape)",
  },
  {
    name: "Mango",
    description: "A sunny tropical mango flavour for a refreshing escape.",
    image: "/assets/mango.png",
    accent: "mango",
    accentVar: "var(--flavour-mango)",
  },
  {
    name: "Original Soda",
    description: "Classic sparkling refreshment with a clean, crisp finish.",
    image: "/assets/original-soda.png",
    accent: "original",
    accentVar: "var(--flavour-original)",
  },
];

/** Editable business details — leave empty to hide. */
export const company = {
  email: "",
  phone: "",
  location: "",
  socials: [] as { label: string; href: string }[],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Products", href: "#products" },
  { label: "About Us", href: "#about" },
  { label: "Become a Distributor", href: "#distributor" },
  { label: "Contact Us", href: "#contact" },
];

export type EnquiryType = "General" | "Product" | "Distributor";
export function openEnquiry(type: EnquiryType, product?: string) {
  window.dispatchEvent(new CustomEvent("dds:enquire", { detail: { type, product } }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => document.getElementById("cf-name")?.focus({ preventScroll: true }), 600);
}
