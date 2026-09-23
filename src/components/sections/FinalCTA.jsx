import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { EDITORIAL_IMAGES } from "@/lib/images";
import Reveal from "@/components/Reveal";

// Final campaign CTA — image carries the section.
export default function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[70vh] md:h-[90vh]">
        <Image
          src={EDITORIAL_IMAGES.finalCta}
          alt="Get Dressed — Dressed By Priv"
          fittingType="fill"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <Reveal>
            <h2 className="font-serif-display text-background text-5xl md:text-7xl lg:text-8xl tracking-tight">
              Get Dressed.
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/shop?filter=new"
                className="bg-background text-foreground text-[11px] tracking-editorial uppercase px-8 py-3.5 hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                Shop New In
              </Link>
              <Link
                to="/?section=store"
                className="text-background text-[11px] tracking-editorial uppercase border-b border-background/50 pb-1 hover:border-background transition-colors"
              >
                Visit The Boutique
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}