import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productService";

function newestFirst(a, b) {
  const dateA = new Date(a.created_at || 0).getTime();
  const dateB = new Date(b.created_at || 0).getTime();
  return dateB - dateA || Number(b.id) - Number(a.id);
}

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    getProducts()
      .then((data) => {
        if (active) setProducts(Array.isArray(data) ? [...data].sort(newestFirst).slice(0, 4) : []);
      })
      .catch((error) => {
        console.error("Unable to load new arrivals:", error);
        if (active) setFailed(true);
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#034694]">Fresh from the shop</p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">Just landed</h2>
          </div>
          <Link to="/shop" className="inline-flex shrink-0 items-center gap-2 border-b border-slate-300 pb-1 text-xs font-bold text-slate-700 transition hover:border-[#034694] hover:text-[#034694] sm:text-sm">
            All shirts <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => <div key={index} className="animate-pulse"><div className="aspect-[4/5] bg-[#eeece5]" /><div className="mt-4 h-3 w-1/3 bg-slate-200" /><div className="mt-3 h-4 w-3/4 bg-slate-200" /></div>)}
          </div>
        ) : products.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 lg:grid-cols-4">
            {products.map((product) => (
              <Link key={product.id} to={`/product/${product.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#eeece5]">
                  <img
                    src={product.image_url || product.image || "/images/chelsea-home.jpg"}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-3 bg-white/95 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                    {product.category || "Jersey"}
                  </span>
                  {Number(product.stock) <= 0 && <span className="absolute bottom-3 left-3 bg-slate-900 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">Sold out</span>}
                </div>
                <div className="mt-3 flex items-start justify-between gap-3 border-b border-slate-200 pb-3 transition-colors group-hover:border-[#034694]">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{product.team || "The collection"}</p>
                    <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-slate-900 sm:text-base">{product.name}</h3>
                  </div>
                  <span className="shrink-0 text-sm font-extrabold text-[#034694]">KSh {Number(product.price).toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border-y border-slate-200 py-8 text-sm text-slate-600">
            {failed ? "New arrivals are unavailable right now." : "New shirts will appear here as they are added to the shop."}
          </div>
        )}
      </div>
    </section>
  );
}
