import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-[#f2f0e9]">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:min-h-[600px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-14">
        <div className="py-4 sm:py-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#034694]">
            Club shirts · National colours · Classics
          </p>
          <h1 className="mt-5 max-w-xl font-serif text-5xl font-bold leading-[0.98] tracking-tight text-[#111820] sm:text-6xl lg:text-7xl">
            Some shirts <span className="text-[#034694]">mean more.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            The colours you grew up with. The team you found along the way. Find your next matchday shirt here.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/shop" className="inline-flex items-center gap-2 bg-[#034694] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#012f68]">
              <ShoppingBag size={17} /> Shop the collection
            </Link>
            <Link to="/shop?type=national" className="inline-flex items-center gap-2 border-b border-slate-400 py-3 text-sm font-bold text-slate-800 transition hover:border-[#034694] hover:text-[#034694]">
              Shop national teams <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-9 flex items-center gap-3 border-t border-slate-300 pt-5 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <span>Delivery across Kenya</span><span className="text-[#034694]">/</span><span>M-Pesa checkout</span>
          </div>
        </div>

        <Link to="/shop?type=club" className="group relative block bg-[#e5e2da]">
          <div className="flex min-h-[360px] items-center justify-center overflow-hidden sm:min-h-[470px] lg:min-h-[520px]">
            <img
              src="/images/chelsea-nike-home.avif"
              alt="Chelsea home jersey"
              className="h-full max-h-[520px] w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute left-4 top-4 bg-white px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-700 sm:left-6 sm:top-6">
              The home shirt · 2026/27
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-black/10 bg-white px-5 py-4 sm:px-7">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-slate-500">From the club collection</p>
              <p className="mt-1 font-bold text-slate-900">Chelsea · Home</p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center bg-[#034694] text-white transition group-hover:bg-[#012f68]"><ArrowRight size={18} /></span>
          </div>
        </Link>
      </div>
    </section>
  );
}
