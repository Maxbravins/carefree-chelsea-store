import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getProducts } from "../../services/productService";
import ProductCard from "../ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    getProducts().then((data) => { if (active) setProducts(Array.isArray(data) ? data.slice(0, 8) : []); })
      .catch((error) => { console.error("Unable to load featured products:", error); if (active) setFailed(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return <section className="bg-slate-50 py-20 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6">
    <div className="mb-10 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#034694]">The Blue Edit</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">Matchday essentials</h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">Find your next favourite from the latest club and national team jerseys.</p></div><Link to="/shop" className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#034694] transition hover:border-[#034694] hover:bg-[#034694] hover:text-white">Shop all products <ArrowRight size={17} /></Link></div>
    {loading ? <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="aspect-square animate-pulse bg-slate-200" /><div className="space-y-3 p-5"><div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" /><div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" /><div className="h-10 animate-pulse rounded-xl bg-slate-100" /></div></div>)}</div>
      : products.length > 0 ? <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      : <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center"><h3 className="text-xl font-extrabold text-slate-900">{failed ? "Products are taking a break" : "New gear is on the way"}</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">{failed ? "We couldn't load the collection right now. Visit the shop and try again shortly." : "There are no featured items to show just yet. Explore the shop for the full collection."}</p><Link to="/shop" className="mt-5 inline-flex items-center gap-2 font-bold text-[#034694] hover:underline">Browse the shop <ArrowRight size={16} /></Link></div>}
  </div></section>;
}
