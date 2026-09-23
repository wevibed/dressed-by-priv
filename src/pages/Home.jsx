import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Product } from "@/data/products";
import Hero from "@/components/sections/Hero";
import NewIn from "@/components/sections/NewIn";
import TheEdit from "@/components/sections/TheEdit";
import InStoreNow from "@/components/sections/InStoreNow";
import EditorialBreak from "@/components/sections/EditorialBreak";
import PrivEdit from "@/components/sections/PrivEdit";
import WornByYou from "@/components/sections/WornByYou";
import StoreInfo from "@/components/sections/StoreInfo";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await Product.list("-created_date", 50);
        if (active) setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  // Scroll to section from query param (?section=...)
  useEffect(() => {
    if (loading) return;
    const params = new URLSearchParams(location.search);
    const section = params.get("section");
    if (section) {
      const el = document.getElementById(section);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-6 h-6 border border-foreground/30 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Hero />
      <NewIn products={products} />
      <TheEdit />
      <InStoreNow products={products} />
      <EditorialBreak />
      <PrivEdit />
      <WornByYou />
      <StoreInfo />
      <FinalCTA />
    </>
  );
}