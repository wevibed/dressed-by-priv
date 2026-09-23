import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { EDITORIAL_IMAGES } from "@/lib/images";
import { BOUTIQUE } from "@/lib/boutique";
import Reveal from "@/components/Reveal";

// Full-width editorial image break — visual breathing room.
export default function EditorialBreak() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[60vh] md:h-[80vh]">
        <Image
          src={EDITORIAL_IMAGES.editorialBreak}
          alt="Dressed By Priv editorial"
          fittingType="fill"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <Reveal>
            <p className="text-[11px] tracking-editorial uppercase text-background/80 mb-4">
              {BOUTIQUE.name}
            </p>
            <h2 className="font-serif-display text-background text-4xl md:text-6xl lg:text-7xl tracking-tight">
              Make The Moment Yours.
            </h2>
            <Link
              to="/shop?occasion=Occasion"
              className="mt-7 inline-block text-background text-[11px] tracking-editorial uppercase border-b border-background/50 pb-1 hover:border-background transition-colors"
            >
              Shop Occasion
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}