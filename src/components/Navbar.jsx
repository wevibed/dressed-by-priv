import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { BOUTIQUE, whatsappEnquiry } from "@/lib/boutique";

const NAV_LINKS = [
  { label: "New In", to: "/?section=new-in" },
  { label: "Shop", to: "/shop" },
  { label: "Occasions", to: "/?section=the-edit" },
  { label: "Collections", to: "/shop" },
  { label: "Contact", to: "/?section=store" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: mobile menu + desktop nav */}
            <div className="flex items-center gap-6">
              <button
                aria-label="Menu"
                className="md:hidden -ml-1 p-1"
                onClick={() => setOpen(true)}
              >
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <nav className="hidden md:flex items-center gap-7">
                {NAV_LINKS.slice(0, 3).map((l) => (
                  <NavLink key={l.label} {...l} />
                ))}
              </nav>
            </div>

            {/* Center: logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <span className="font-serif-display text-lg md:text-2xl tracking-editorial uppercase font-medium whitespace-nowrap">
                {BOUTIQUE.name}
              </span>
            </Link>

            {/* Right: nav + search + whatsapp */}
            <div className="flex items-center gap-5 md:gap-7">
              <nav className="hidden md:flex items-center gap-7">
                {NAV_LINKS.slice(3).map((l) => (
                  <NavLink key={l.label} {...l} />
                ))}
              </nav>
              <button
                aria-label="Search"
                className="p-1"
                onClick={() => setSearchOpen((s) => !s)}
              >
                <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>
              <a
                href={whatsappEnquiry({ name: "your enquiry" })}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-block text-[11px] tracking-editorial uppercase border border-foreground/70 px-4 py-2 hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[60] bg-background transition-transform duration-500 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-border">
          <span className="font-serif-display text-lg tracking-editorial uppercase">
            {BOUTIQUE.name}
          </span>
          <button aria-label="Close" onClick={() => setOpen(false)} className="p-1">
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-col px-5 pt-6">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="font-serif-display text-3xl py-4 border-b border-border/60"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={whatsappEnquiry({ name: "your enquiry" })}
            target="_blank"
            rel="noreferrer"
            className="mt-8 text-center text-[11px] tracking-editorial uppercase border border-foreground px-4 py-3"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </>
  );
}

function NavLink({ label, to }) {
  return (
    <Link
      to={to}
      className="text-[11px] tracking-editorial uppercase text-foreground/80 hover:text-foreground transition-colors duration-300"
    >
      {label}
    </Link>
  );
}

function SearchBar({ onClose }) {
  return (
    <div className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-5">
        <div className="flex items-center gap-3">
          <Search className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          <input
            autoFocus
            placeholder="Search the boutique…"
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          <button onClick={onClose} className="text-[11px] tracking-editorial uppercase text-muted-foreground">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}