import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { Truck, ShieldCheck, CreditCard, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  const { products, loading, error } = useProducts();

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden hero-gradient text-white shadow-2xl p-8 sm:p-12 lg:p-16 border border-white/10">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-extrabold tracking-wider uppercase text-amber-300">
            <Sparkles size={14} /> 2026/27 Official Nike Collection
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Wear The Pride <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-white">
              Of Chelsea FC
            </span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed">
            Get the latest official Chelsea jerseys, retro classic editions, and custom name-printed kits delivered straight to your doorstep across Kenya.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-7 py-4 rounded-2xl font-extrabold text-base shadow-xl hover:shadow-amber-400/20 transition active:scale-95"
            >
              <span>Explore Jersey Shop</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/cart"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-7 py-4 rounded-2xl font-bold text-base border border-white/20 backdrop-blur-md transition"
            >
              <span>View Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Value Props */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold shrink-0">
            <Truck size={24} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Express Shipping</h3>
            <p className="text-slate-500 text-xs mt-0.5">Nairobi 24h • Countrywide 2-4 Days</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">100% Authentic Apparel</h3>
            <p className="text-slate-500 text-xs mt-0.5">Official Nike Badges & Breathable Mesh</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
            <CreditCard size={24} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">M-Pesa Instant Pay</h3>
            <p className="text-slate-500 text-xs mt-0.5">Secure STK Push & Buy Goods Pay</p>
          </div>
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div>
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">Featured Kits</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Latest Chelsea Jerseys</h2>
          </div>

          <Link to="/shop" className="text-sm font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1">
            <span>View All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
            <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full mb-3"></div>
            <p className="text-slate-500 font-semibold text-sm">Loading official catalog...</p>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 rounded-2xl text-center">
            <p className="font-bold">{error}</p>
            <p className="text-xs mt-1 text-rose-600">Ensure the backend API is running on port 8000.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

