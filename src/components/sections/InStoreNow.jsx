import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

// In Store Now — live catalogue with availability statuses.
export default function InStoreNow({ products }) {
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    setUpdated(`Updated Today, ${time}`);
  }, []);

  return (
    <section id="in-store" className="scroll-mt-24 py-16 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-14">
          <div>
            <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-2">Live Catalogue</p>
            <h2 className="font-serif-display text-4xl md:text-6xl tracking-tight">In Store Now</h2>
          </div>
          <div className="flex items-center gap-2 text-[11px] tracking-wide-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-foreground animate-softpulse" />
            <span>{updated}</span>
          </div>
        </Reveal>

        <ProductGrid products={products || []} eagerCount={4} />

        <Reveal className="mt-10 md:mt-14 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[11px] tracking-editorial uppercase border border-foreground px-8 py-3.5 hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            View Full Boutique <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}