import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import { OCCASIONS } from "@/lib/boutique";

// Occasion imagery — reuse product imagery per occasion for now.
// Swap these with curated occasion photography when available.
const OCCASION_TILES = [
  { name: "Work", image: "https://media.base44.com/images/public/6ab3a4b34334bb31adfdd4e6/a144766a2_generated_002f43eb.jpg", span: "tall" },
  { name: "Dinner", image: "https://media.base44.com/images/public/6ab3a4b34334bb31adfdd4e6/721c16612_generated_21775333.jpg", span: "wide" },
  { name: "Occasion", image: "https://media.base44.com/images/public/6ab3a4b34334bb31adfdd4e6/4b349c570_generated_e8f93103.jpg", span: "tall" },
  { name: "Weekend", image: "https://media.base44.com/images/public/6ab3a4b34334bb31adfdd4e6/1493dbdf7_generated_b39c7084.jpg", span: "wide" },
  { name: "Everyday", image: "https://media.base44.com/images/public/6ab3a4b34334bb31adfdd4e6/b5b045209_generated_3d469933.jpg", span: "wide" },
];

export default function TheEdit() {
  return (
    <section id="the-edit" className="scroll-mt-24 py-16 md:py-28 bg-secondary/40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal className="text-center mb-10 md:mb-16">
          <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-2">Shop By Occasion</p>
          <h2 className="font-serif-display text-4xl md:text-6xl tracking-tight">The Edit</h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[280px]">
          {OCCASION_TILES.map((tile, i) => (
            <Reveal
              key={tile.name}
              delay={i * 60}
              className={`relative group overflow-hidden ${
                tile.span === "tall" ? "row-span-2" : "row-span-1 lg:col-span-2"
              }`}
            >
              <Link to={`/shop?occasion=${tile.name}`} className="block w-full h-full">
                <Image
                  src={tile.image}
                  alt={tile.name}
                  fittingType="fill"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-end p-4 md:p-6">
                  <h3 className="font-serif-display text-background text-2xl md:text-4xl tracking-tight">
                    {tile.name}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}