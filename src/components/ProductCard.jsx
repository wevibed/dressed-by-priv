import { useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { formatPrice, availabilityTone, whatsappEnquiry } from "@/lib/boutique";
import { MessageCircle } from "lucide-react";

// Product card — image dominates. Name, price, availability, sizes below.
export default function ProductCard({ product, index = 0, eager = false }) {
  const [hovered, setShow] = useState(false);
  const tone = availabilityTone(product.availability);
  const soldOut = product.availability === "Sold Out";
  const primary = product.images?.[0];
  const secondary = product.images?.[1] || product.images?.[0];
  const hasSale = product.sale_price != null && product.sale_price < product.price;

  return (
    <div
      className="group reveal is-visible"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden bg-secondary aspect-[4/5]">
          {primary && (
            <Image
              src={primary}
              alt={product.name}
              fittingType="fill"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                hovered && secondary ? "opacity-0" : "opacity-100"
              } ${soldOut ? "grayscale-[35%]" : ""}`}
            />
          )}
          {secondary && (
            <Image
              src={secondary}
              alt={product.name}
              fittingType="fill"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Availability badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-background/85 backdrop-blur-sm px-2.5 py-1">
            <span className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
            <span className={`text-[10px] tracking-wide-sm uppercase ${tone.text}`}>{tone.label}</span>
          </div>

          {hasSale && (
            <div className="absolute top-3 right-3 bg-foreground text-background text-[10px] tracking-wide-sm uppercase px-2.5 py-1">
              Sale
            </div>
          )}

          {soldOut && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-background/90 text-foreground text-[11px] tracking-editorial uppercase px-4 py-2">
                Sold Out
              </span>
            </div>
          )}

          {/* Quick enquiry — subtle, desktop hover */}
          {!soldOut && (
            <div
              className={`absolute bottom-3 left-3 right-3 flex justify-center transition-all duration-500 ${
                hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <span
                onClick={(e) => {
                  e.preventDefault();
                  window.open(whatsappEnquiry(product), "_blank");
                }}
                className="hidden md:inline-flex items-center gap-2 bg-foreground/90 text-background text-[10px] tracking-wide-sm uppercase px-4 py-2.5 hover:bg-foreground transition-colors"
              >
                <MessageCircle className="w-3 h-3" strokeWidth={1.5} /> Quick Enquiry
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pt-3 pb-1">
          <h3 className="font-serif-display text-lg md:text-xl leading-snug">{product.name}</h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-sm text-foreground/80">{formatPrice(hasSale ? product.sale_price : product.price)}</span>
            {hasSale && (
              <span className="text-xs text-muted-foreground line-through">{formatPrice(product.price)}</span>
            )}
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground tracking-wide-sm">
            <span className={`uppercase ${tone.text}`}>{tone.label}</span>
            <span className="text-border">·</span>
            <span className="uppercase">{(product.sizes || []).slice(0, 4).join(" / ")}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}