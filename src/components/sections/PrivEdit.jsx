import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { EDITORIAL_IMAGES } from "@/lib/images";
import Reveal from "@/components/Reveal";

// The Priv Edit — one campaign moment.
export default function PrivEdit() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[70vh] md:h-[90vh]">
        <Image
          src={EDITORIAL_IMAGES.privEdit}
          alt="The Priv Edit campaign"
          fittingType="fill"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <Reveal>
            <p className="text-[11px] tracking-editorial uppercase text-background/70 mb-3">Campaign</p>
            <h2 className="font-serif-display text-background text-5xl md:text-7xl lg:text-8xl tracking-tight">
              The Priv Edit
            </h2>
            <p className="mt-4 font-serif-display italic text-background/90 text-xl md:text-3xl tracking-wide-sm">
              Dress The Moment.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-block bg-background text-foreground text-[11px] tracking-editorial uppercase px-8 py-3.5 hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Explore
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}