import { EDITORIAL_IMAGES } from "@/lib/images";

// Static product catalogue — replaces the live Base44 Product entity.
// The export contained only the entity schema, no real product records, and
// no per-product photography — only editorial/campaign imagery. Names,
// descriptions and images below are placeholders; price is set to 0 on
// purpose so it can't be mistaken for a real number. Edit this file to add
// your real inventory and product photography.
const W = EDITORIAL_IMAGES.wornByYou;

export const PRODUCTS = [
  {
    id: "p-dresses-01",
    name: "Silk Wrap Dress",
    slug: "silk-wrap-dress",
    price: 0,
    sale_price: null,
    category: "Dresses",
    occasions: ["Dinner", "Occasion"],
    description: "A fluid wrap dress cut to move — equally at home at dinner or a dressed-up evening out.",
    sizes: ["S", "M", "L"],
    colours: ["Black"],
    images: [W[0], W[1]],
    availability: "Available",
    featured: true,
    new_arrival: true,
  },
  {
    id: "p-sets-01",
    name: "Tailored Two-Piece Set",
    slug: "tailored-two-piece-set",
    price: 0,
    sale_price: null,
    category: "Sets",
    occasions: ["Work", "Everyday"],
    description: "A coordinated set built for easy mixing — worn together or split across the week.",
    sizes: ["S", "M", "L"],
    colours: ["Sand"],
    images: [W[2], W[3]],
    availability: "Available",
    featured: false,
    new_arrival: true,
  },
  {
    id: "p-workwear-01",
    name: "Structured Blazer",
    slug: "structured-blazer",
    price: 0,
    sale_price: null,
    category: "Workwear",
    occasions: ["Work"],
    description: "A sharply tailored blazer that anchors a workwear look without trying too hard.",
    sizes: ["S", "M", "L"],
    colours: ["Charcoal"],
    images: [W[4], W[5]],
    availability: "Low Stock",
    featured: false,
    new_arrival: true,
  },
  {
    id: "p-occasion-01",
    name: "Beaded Occasion Gown",
    slug: "beaded-occasion-gown",
    price: 0,
    sale_price: null,
    category: "Occasion",
    occasions: ["Occasion"],
    description: "A statement gown for the nights that call for one — finished with hand-placed beading.",
    sizes: ["S", "M", "L"],
    colours: ["Emerald"],
    images: [W[1], W[4]],
    availability: "Available",
    featured: false,
    new_arrival: false,
  },
  {
    id: "p-cocktail-01",
    name: "Cocktail Slip Dress",
    slug: "cocktail-slip-dress",
    price: 0,
    sale_price: null,
    category: "Cocktail",
    occasions: ["Cocktail", "Dinner"],
    description: "A bias-cut slip dress that carries a cocktail hour without a single fuss.",
    sizes: ["XS", "S", "M"],
    colours: ["Wine"],
    images: [W[2], W[0]],
    availability: "Available",
    featured: false,
    new_arrival: false,
  },
  {
    id: "p-tops-01",
    name: "Satin Blouse",
    slug: "satin-blouse",
    price: 0,
    sale_price: null,
    category: "Tops",
    occasions: ["Work", "Everyday"],
    description: "A lightweight satin blouse that layers cleanly under a blazer or stands on its own.",
    sizes: ["XS", "S", "M", "L"],
    colours: ["Ivory"],
    images: [W[3], W[5]],
    availability: "Available",
    featured: false,
    new_arrival: false,
  },
  {
    id: "p-outerwear-01",
    name: "Wool Trench Coat",
    slug: "wool-trench-coat",
    price: 0,
    sale_price: null,
    category: "Outerwear",
    occasions: ["Everyday", "Work"],
    description: "A classic wool trench, cut long, for the pieces that finish every outfit underneath it.",
    sizes: ["S", "M", "L"],
    colours: ["Camel"],
    images: [W[5], W[2]],
    availability: "Sold Out",
    featured: false,
    new_arrival: false,
  },
];

// Mirrors the subset of the Base44 entity SDK's call shape (list/filter)
// that this app used, so the consuming components didn't need their fetch
// logic rewritten — only the import.
export const Product = {
  async list(_sort, limit) {
    let items = PRODUCTS;
    if (limit) items = items.slice(0, limit);
    return items;
  },
  async filter(query = {}, _sort, limit) {
    let items = PRODUCTS.filter((p) =>
      Object.entries(query).every(([key, value]) => p[key] === value)
    );
    if (limit) items = items.slice(0, limit);
    return items;
  },
};
