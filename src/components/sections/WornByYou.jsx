import { Image } from "@/components/ui/image";
import { EDITORIAL_IMAGES } from "@/lib/images";
import { BOUTIQUE as B } from "@/lib/boutique";
import Reveal from "@/components/Reveal";
import { Instagram } from "lucide-react";

// Worn By You — Instagram-style visual grid. No invented testimonials.
export default function WornByYou() {
  const images = EDITORIAL_IMAGES.wornByYou;
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal className="text-center mb-10 md:mb-14">
          <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-2">Customer Style</p>
          <h2 className="font-serif-display text-4xl md:text-6xl tracking-tight">Worn By You</h2>
        </Reveal>

        <Reveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1.5 md:gap-2">
          {images.map((src, i) => (
            <a
              key={i}
              href={B.instagram}
              target="_blank"
              rel="noreferrer"
              className="relative group block aspect-square overflow-hidden bg-secondary"
            >
              <Image
                src={src}
                alt={`Customer style ${i + 1}`}
                fittingType="fill"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500 flex items-center justify-center">
                <Instagram className="w-5 h-5 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500" strokeWidth={1.5} />
              </div>
            </a>
          ))}
        </Reveal>

        <Reveal className="mt-8 md:mt-10 text-center">
          <a
            href={B.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[11px] tracking-editorial uppercase border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            <Instagram className="w-3.5 h-3.5" strokeWidth={1.5} /> {B.instagramHandle} · Follow
          </a>
        </Reveal>
      </div>
    </section>
  );
}