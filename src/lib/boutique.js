// Boutique configuration — single source of truth for store details.
// Swap these values to rebrand the storefront for another boutique client.

export const BOUTIQUE = {
  name: "Dressed By Priv",
  tagline: "Style For Every Occasion",
  // WhatsApp number in international format, no plus or spaces.
  whatsapp: "263771234567",
  whatsappDisplay: "+263 77 123 4567",
  phone: "+263 77 123 4567",
  email: "hello@dressedbypriv.co.zw",
  instagram: "https://instagram.com/dressedbypriv",
  instagramHandle: "@dressedbypriv",
  facebook: "https://facebook.com/dressedbypriv",
  address: {
    line1: "Shop 7B",
    line2: "Shamwari Complex",
    line3: "157 Second Street Extension",
    line4: "Belgravia, Harare",
  },
  hours: [
    { day: "Mon – Fri", time: "9:00 – 17:30" },
    { day: "Saturday", time: "9:00 – 16:00" },
    { day: "Sunday", time: "Closed" },
  ],
  mapsUrl: "https://maps.google.com/?q=Belgravia+Harare+Second+Street+Extension",
};

export const CATEGORIES = [
  "All",
  "Dresses",
  "Sets",
  "Workwear",
  "Occasion",
  "Cocktail",
  "Tops",
  "Outerwear",
];

export const OCCASIONS = [
  "Work",
  "Dinner",
  "Cocktail",
  "Occasion",
  "Weekend",
  "Everyday",
];

// Build a pre-filled WhatsApp enquiry link for a product.
export function whatsappEnquiry(product, size = null) {
  const base = `https://wa.me/${BOUTIQUE.whatsapp}?text=`;
  const name = product?.name ?? "this piece";
  const sizePart = size ? ` size ${size}` : "";
  const price = product?.price ? ` ($${product.price})` : "";
  const msg = `Hi Dressed By Priv, I'm interested in the ${name}${sizePart}${price}. Is it still available?`;
  return base + encodeURIComponent(msg);
}

export function formatPrice(price) {
  if (price == null) return "";
  return `$${Number(price).toFixed(0)}`;
}

export function availabilityTone(status) {
  switch (status) {
    case "Available":
      return { dot: "bg-[#5E6B5E]", text: "text-[#5E6B5E]", label: "Available" };
    case "Low Stock":
      return { dot: "bg-[#BC5A45]", text: "text-[#BC5A45]", label: "Low Stock" };
    case "Sold Out":
      return { dot: "bg-foreground/40", text: "text-foreground/40", label: "Sold Out" };
    default:
      return { dot: "bg-[#5E6B5E]", text: "text-[#5E6B5E]", label: "Available" };
  }
}