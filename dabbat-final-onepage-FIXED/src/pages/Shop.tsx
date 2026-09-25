import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../lib/productStore";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const search = searchParams.get("search")?.toLowerCase() || "";
  const sort = searchParams.get("sort");
  const [products, setProducts] = useState(getProducts);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const refreshProducts = () => setProducts(getProducts());
    window.addEventListener("storage", refreshProducts);
    window.addEventListener("dabbat-products-updated", refreshProducts);
    return () => {
      window.removeEventListener("storage", refreshProducts);
      window.removeEventListener("dabbat-products-updated", refreshProducts);
    };
  }, []);
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const filtered = products.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    (!search || `${p.name} ${p.category}`.toLowerCase().includes(search))
  );
  const visibleProducts = sort === "best" ? [...filtered].reverse() : filtered;

  return (
    <div className="shop-page">
      <p className="eyebrow">SHOP / THE COLLECTION</p>
      <div className="shop-head"><div><h1>THE COLLECTION<span>.</span></h1><p>Refined essentials for everyday movement.</p></div><span className="eyebrow">{filtered.length.toString().padStart(2,"0")} PIECES</span></div>
      <div className="shop-filters">
        {categories.map(cat => <button key={cat} onClick={()=>setSearchParams(cat==="All"?{}:{category:cat})} className={activeCategory===cat?"active":""}>{cat.toUpperCase()}</button>)}
      </div>
      <div className="shop-grid">{visibleProducts.map(p=><ProductCard key={p.id} product={p}/>)}</div>
    </div>
  );
}
