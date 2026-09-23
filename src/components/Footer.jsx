import { Link } from "react-router-dom";
import { Instagram, Facebook, MessageCircle, MapPin } from "lucide-react";
import { BOUTIQUE } from "@/lib/boutique";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <h2 className="font-serif-display text-2xl md:text-3xl tracking-editorial uppercase">
              {BOUTIQUE.name}
            </h2>
            <p className="mt-4 text-sm text-background/60 max-w-xs leading-relaxed">
              {BOUTIQUE.tagline}. Belgravia, Harare.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <SocialLink href={BOUTIQUE.instagram} label="Instagram"><Instagram className="w-4 h-4" strokeWidth={1.5} /></SocialLink>
              <SocialLink href={BOUTIQUE.facebook} label="Facebook"><Facebook className="w-4 h-4" strokeWidth={1.5} /></SocialLink>
              <SocialLink href={`https://wa.me/${BOUTIQUE.whatsapp}`} label="WhatsApp"><MessageCircle className="w-4 h-4" strokeWidth={1.5} /></SocialLink>
            </div>
          </div>

          {/* Shop */}
          <div className="md:col-span-2">
            <FooterTitle>Shop</FooterTitle>
            <FooterLinks
              links={[
                { label: "New In", to: "/?section=new-in" },
                { label: "All", to: "/shop" },
                { label: "Dresses", to: "/shop?category=Dresses" },
                { label: "Sets", to: "/shop?category=Sets" },
                { label: "Outerwear", to: "/shop?category=Outerwear" },
              ]}
            />
          </div>

          {/* Boutique */}
          <div className="md:col-span-3">
            <FooterTitle>Boutique</FooterTitle>
            <ul className="space-y-2 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-1 shrink-0" strokeWidth={1.5} />
                <span>
                  {BOUTIQUE.address.line1}, {BOUTIQUE.address.line2}
                  <br />
                  {BOUTIQUE.address.line3}
                  <br />
                  {BOUTIQUE.address.line4}
                </span>
              </li>
              <li><a href={`tel:${BOUTIQUE.phone}`} className="hover:text-background transition-colors">{BOUTIQUE.phone}</a></li>
            </ul>
            <FooterTitle className="mt-6">Hours</FooterTitle>
            <ul className="space-y-1 text-sm text-background/70">
              {BOUTIQUE.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-background/50">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="md:col-span-3">
            <FooterTitle>Information</FooterTitle>
            <FooterLinks
              links={[
                { label: "Occasions", to: "/?section=the-edit" },
                { label: "In Store Now", to: "/?section=in-store" },
                { label: "Contact", to: "/?section=store" },
                { label: "Privacy", to: "/" },
                { label: "Returns", to: "/" },
              ]}
            />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/15 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] tracking-wide-sm text-background/40">
          <span>© {new Date().getFullYear()} {BOUTIQUE.name}. All rights reserved.</span>
          <span>Belgravia · Harare · Zimbabwe</span>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children, className = "" }) {
  return <h3 className={`text-[11px] tracking-editorial uppercase text-background/50 mb-4 ${className}`}>{children}</h3>;
}

function FooterLinks({ links }) {
  return (
    <ul className="space-y-2.5 text-sm text-background/70">
      {links.map((l) => (
        <li key={l.label}>
          <Link to={l.to} className="hover:text-background transition-colors duration-300">{l.label}</Link>
        </li>
      ))}
    </ul>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center border border-background/25 hover:bg-background hover:text-foreground transition-colors duration-300"
    >
      {children}
    </a>
  );
}