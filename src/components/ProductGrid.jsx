import ProductCard from "@/components/ProductCard";

// Responsive product grid: 2 cols mobile, 3-4 desktop.
export default function ProductGrid({ products, eagerCount = 4, cols = "default" }) {
  const colClass =
    cols === "wide"
      ? "grid-cols-2 lg:grid-cols-4"
      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid ${colClass} gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12`}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} eager={i < eagerCount} />
      ))}
    </div>
  );
}