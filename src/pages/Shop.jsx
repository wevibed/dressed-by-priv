import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Product } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import { CATEGORIES, OCCASIONS } from "@/lib/boutique";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const location = useLocation();

  const category = params.get("category") || "All";
  const occasion = params.get("occasion") || "All";
  const filter = params.get("filter") || "";

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await Product.list("-created_date", 100);
        if (active) setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const setQuery = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === "All") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (occasion !== "All") list = list.filter((p) => (p.occasions || []).includes(occasion));
    if (filter === "new") list = list.filter((p) => p.new_arrival);
    return list;
  }, [products, category, occasion, filter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-6 h-6 border border-foreground/30 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 pt-12 md:pt-20 pb-8 md:pb-12">
        <Reveal>
          <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-2">The Boutique</p>
          <h1 className="font-serif-display text-5xl md:text-7xl tracking-tight">Shop</h1>
        </Reveal>
      </div>

      {/* Filters */}
      <div className="sticky top-16 md:top-20 z-30 bg-background/90 backdrop-blur-md border-y border-border">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-3 md:py-4">
          <div className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar">
            <span className="text-[11px] tracking-editorial uppercase text-muted-foreground shrink-0">Category</span>
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c}
                active={category === c}
                onClick={() => setQuery("category", c === "All" ? null : c)}
              >
                {c}
              </FilterChip>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-6 mt-3">
            <span className="text-[11px] tracking-editorial uppercase text-muted-foreground shrink-0">Occasion</span>
            <button
              onClick={() => setQuery("occasion", null)}
              className={`text-[11px] tracking-wide-sm uppercase pb-0.5 transition-colors ${
                occasion === "All" ? "text-foreground border-b border-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {OCCASIONS.map((o) => (
              <button
                key={o}
                onClick={() => setQuery("occasion", o)}
                className={`text-[11px] tracking-wide-sm uppercase pb-0.5 transition-colors ${
                  occasion === o ? "text-foreground border-b border-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-10 md:py-16">
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <p className="text-[11px] tracking-wide-sm uppercase text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "Piece" : "Pieces"}
          </p>
          {(category !== "All" || occasion !== "All" || filter) && (
            <button
              onClick={() => setParams({}, { replace: true })}
              className="text-[11px] tracking-editorial uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif-display text-2xl text-muted-foreground">No pieces match this selection.</p>
            <button
              onClick={() => setParams({}, { replace: true })}
              className="mt-4 text-[11px] tracking-editorial uppercase border-b border-foreground pb-1"
            >
              View All
            </button>
          </div>
        ) : (
          <ProductGrid products={filtered} eagerCount={8} />
        )}
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] tracking-wide-sm uppercase whitespace-nowrap pb-0.5 transition-colors ${
        active ? "text-foreground border-b border-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}