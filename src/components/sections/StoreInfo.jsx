import { MapPin, Phone, MessageCircle, Instagram, Facebook, Clock } from "lucide-react";
import { BOUTIQUE } from "@/lib/boutique";
import Reveal from "@/components/Reveal";

// Visit The Boutique — store details, kept compact.
export default function StoreInfo() {
  return (
    <section id="store" className="scroll-mt-24 py-16 md:py-28 bg-secondary/40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal className="text-center mb-10 md:mb-14">
          <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-2">Find Us</p>
          <h2 className="font-serif-display text-4xl md:text-6xl tracking-tight">Visit The Boutique</h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
          {/* Address + contact */}
          <Reveal className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-1 shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-1">Address</p>
                <p className="text-sm leading-relaxed">
                  {BOUTIQUE.address.line1}, {BOUTIQUE.address.line2}
                  <br />
                  {BOUTIQUE.address.line3}
                  <br />
                  {BOUTIQUE.address.line4}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-1 shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-1">Phone</p>
                <a href={`tel:${BOUTIQUE.phone}`} className="text-sm hover:text-accent transition-colors">{BOUTIQUE.phone}</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle className="w-4 h-4 mt-1 shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-1">WhatsApp</p>
                <a href={`https://wa.me/${BOUTIQUE.whatsapp}`} target="_blank" rel="noreferrer" className="text-sm hover:text-accent transition-colors">{BOUTIQUE.whatsappDisplay}</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 mt-1 shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-1">Opening Hours</p>
                <ul className="text-sm space-y-1">
                  {BOUTIQUE.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-8">
                      <span>{h.day}</span>
                      <span className="text-muted-foreground">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a href={BOUTIQUE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center border border-border hover:bg-foreground hover:text-background transition-colors">
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a href={BOUTIQUE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center border border-border hover:bg-foreground hover:text-background transition-colors">
                <Facebook className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </Reveal>

          {/* Map / directions */}
          <Reveal delay={100}>
            <a
              href={BOUTIQUE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="block relative h-[340px] md:h-[420px] bg-secondary overflow-hidden group"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <MapPin className="w-8 h-8 text-accent mb-4" strokeWidth={1.25} />
                <p className="font-serif-display text-2xl md:text-3xl mb-1">Belgravia, Harare</p>
                <p className="text-sm text-muted-foreground mb-5">Second Street Extension</p>
                <span className="text-[11px] tracking-editorial uppercase border-b border-foreground pb-1 group-hover:text-accent group-hover:border-accent transition-colors">
                  Get Directions
                </span>
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--secondary))_0%,hsl(var(--background))_70%)] opacity-60" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}