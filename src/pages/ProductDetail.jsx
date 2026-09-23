import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Image } from "@/components/ui/image";
import { formatPrice, availabilityTone, whatsappEnquiry, BOUTIQUE } from "@/lib/boutique";
import { MessageCircle, ChevronLeft, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const matches = await Product.filter({ slug }, "-created_date", 1);
        const p = matches?.[0];
        if (!active) return;
        setProduct(p);
        if (p) {
          setSelectedSize(p.sizes?.[0] || null);
          // related: same category, exclude self
          const all = await Product.filter({ category: p.category }, "-created_date", 10);
          if (active) setRelated((all || []).filter((x) => x.id !== p.id).slice(0, 4));
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-6 h-6 border border-foreground/30 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center px-5">
        <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-3">Not Found</p>
        <h1 className="font-serif-display text-4xl mb-6">This piece is no longer available.</h1>
        <Link to="/shop" className="text-[11px] tracking-editorial uppercase border-b border-foreground pb-1">Back To Shop</Link>
      </div>
    );
  }

  const tone = availabilityTone(product.availability);
  const soldOut = product.availability === "Sold Out";
  const hasSale = product.sale_price != null && product.sale_price < product.price;
  const images = product.images?.length ? product.images : [];
  const enquiryHref = whatsappEnquiry(product, selectedSize);

  return (
    <div className="pt-16 md:pt-20">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 pt-6 md:pt-8">
        <Link to="/shop" className="inline-flex items-center gap-1.5 text-[11px] tracking-wide-sm uppercase text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.5} /> Back
        </Link>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Gallery — 60-70% */}
          <div className="lg:col-span-7 xl:col-span-8">
            {images.length > 0 ? (
              <div className="flex flex-col gap-3">
                {images.map((src, i) => (
                  <div key={i} className="relative aspect-[4/5] bg-secondary overflow-hidden">
                    <Image src={src} alt={`${product.name} ${i + 1}`} fittingType="fill" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="aspect-[4/5] bg-secondary" />
            )}
          </div>

          {/* Info — sticky sidebar */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-3">
                {product.category}
              </p>
              <h1 className="font-serif-display text-3xl md:text-5xl tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-xl text-foreground">{formatPrice(hasSale ? product.sale_price : product.price)}</span>
                {hasSale && <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>}
              </div>

              {/* Availability */}
              <div className="mt-5 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${tone.dot}`} />
                <span className={`text-[11px] tracking-wide-sm uppercase ${tone.text}`}>{tone.label}</span>
              </div>

              {/* Description */}
              {product.description && (
                <p className="mt-6 text-sm leading-relaxed text-foreground/70 max-w-md">
                  {product.description}
                </p>
              )}

              {/* Sizes */}
              {product.sizes?.length > 0 && (
                <div className="mt-7">
                  <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-3">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        disabled={soldOut}
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-[3rem] px-3 py-2.5 text-sm border transition-colors ${
                          selectedSize === s
                            ? "bg-foreground text-background border-foreground"
                            : "border-border text-foreground hover:border-foreground"
                        } ${soldOut ? "opacity-40 cursor-not-allowed" : ""}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colours */}
              {product.colours?.length > 0 && (
                <div className="mt-6">
                  <p className="text-[11px] tracking-editorial uppercase text-muted-foreground mb-3">Colour</p>
                  <p className="text-sm">{product.colours.join(" · ")}</p>
                </div>
              )}

              {/* WhatsApp CTA */}
              <div className="mt-8">
                <a
                  href={soldOut ? undefined : enquiryHref}
                  target={soldOut ? undefined : "_blank"}
                  rel={soldOut ? undefined : "noreferrer"}
                  aria-disabled={soldOut}
                  className={`flex items-center justify-center gap-2.5 w-full text-[11px] tracking-editorial uppercase px-6 py-4 transition-colors duration-300 ${
                    soldOut
                      ? "bg-secondary text-muted-foreground cursor-not-allowed"
                      : "bg-foreground text-background hover:bg-accent"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                  {soldOut ? "Currently Unavailable" : "Enquire On WhatsApp"}
                </a>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                  <Check className="w-3 h-3" strokeWidth={1.5} /> No account required
                </p>
              </div>

              {/* Boutique note */}
              <div className="mt-8 pt-6 border-t border-border text-[11px] tracking-wide-sm text-muted-foreground leading-relaxed">
                Enquiries are handled directly by {BOUTIQUE.name}. Your message will include the piece, selected size and price.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You may also like */}
      {related.length > 0 && (
        <section className="py-16 md:py-24 border-t border-border">
          <div className="mx-auto max-w-[1600px] px-5 md:px-10">
            <Reveal className="mb-8 md:mb-12">
              <h2 className="font-serif-display text-3xl md:text-5xl tracking-tight">You May Also Like</h2>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky enquiry bar */}
      {!soldOut && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-t border-border px-5 py-3">
          <a
            href={enquiryHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2.5 w-full bg-foreground text-background text-[11px] tracking-editorial uppercase py-3.5"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
            Enquire {selectedSize ? `· Size ${selectedSize}` : ""} · {formatPrice(hasSale ? product.sale_price : product.price)}
          </a>
        </div>
      )}
    </div>
  );
}