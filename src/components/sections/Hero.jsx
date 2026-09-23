import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { EDITORIAL_IMAGES } from "@/lib/images";
import { BOUTIQUE } from "@/lib/boutique";

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <div className="absolute inset-0 animate-kenburns">
        <Image
          src={EDITORIAL_IMAGES.hero}
          alt="Dressed By Priv — editorial campaign"
          fittingType="fill"
          className="w-full h-full object-cover"
        />
      </div>
      {/* subtle scrim for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />

      {/* Top-left brand lockup */}
      <div className="absolute top-24 md:top-28 left-5 md:left-10">
        <span className="text-background/90 text-[11px] tracking-editorial uppercase">
          {BOUTIQUE.name}
        </span>
      </div>

      {/* Centered editorial statement */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
        <h1 className="font-serif-display text-background text-[12vw] md:text-[7.5vw] lg:text-[6.5rem] leading-[0.95] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.25)]">
          {BOUTIQUE.name}
        </h1>
        <p className="mt-3 md:mt-5 font-serif-display italic text-background/90 text-xl md:text-3xl tracking-wide-sm">
          Style For Every Occasion.
        </p>
      </div>

      {/* Bottom-right CTA */}
      <div className="absolute bottom-8 md:bottom-12 right-5 md:right-10 flex items-center gap-4">
        <Link
          to="/shop?filter=new"
          className="bg-background text-foreground text-[11px] tracking-editorial uppercase px-6 py-3.5 hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          Shop New In
        </Link>
        <Link
          to="/?section=the-edit"
          className="hidden sm:inline-block text-background text-[11px] tracking-editorial uppercase border-b border-background/50 pb-1 hover:border-background transition-colors"
        >
          Explore
        </Link>
      </div>
    </section>
  );
}