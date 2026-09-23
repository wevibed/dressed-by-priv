import { Link } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

// New In — first 4–6 new arrivals.
export default function NewIn({ products }) {
  const items = (products || []).filter((p) => p.new_arrival).slice(0, 6);
  const show = items.length ? items : (products || []).slice(0, 6);

  return (
    <section id="new-in" className="scroll-mt-24 py-16 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal className="flex items-end justify-between mb-8 md:mb-14">
          <div>
            <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-2">Just Arrived</p>
            <h2 className="font-serif-display text-4xl md:text-6xl tracking-tight">New In</h2>
          </div>
          <Link
            to="/shop?filter=new"
            className="group hidden md:inline-flex items-center gap-2 text-[11px] tracking-editorial uppercase text-foreground/70 hover:text-foreground transition-colors"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </Reveal>

        <ProductGrid products={show} eagerCount={6} />

        <Link
          to="/shop?filter=new"
          className="md:hidden mt-8 inline-flex items-center gap-2 text-[11px] tracking-editorial uppercase text-foreground/70"
        >
          View All <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}