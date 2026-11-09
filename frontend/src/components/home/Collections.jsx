import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const collections = [
  {
    number: "01",
    title: "Club shirts",
    detail: "Wear your badge.",
    image: "/images/chelsea-nike-home.avif",
    alt: "Chelsea home shirt",
    to: "/shop?type=club",
  },
  {
    number: "02",
    title: "National teams",
    detail: "Carry your colours.",
    image: "/images/argentina-26-home-authentic-kids.avif",
    alt: "Argentina home shirt",
    to: "/shop?type=national",
  },
  {
    number: "03",
    title: "Home & away",
    detail: "Pick your side of the story.",
    image: "/images/chelsea-nike-away-stadium-shirt-2025-26.avif",
    alt: "Chelsea away shirt",
    to: "/shop?category=Away%20Kit",
  },
  {
    number: "04",
    title: "Retro & classics",
    detail: "The shirts that stay with you.",
    image: "/images/chelsea-nike-stadium-home-long-sleeve-shirt-2025-26.jpg",
    alt: "Chelsea long sleeve classic shirt",
    to: "/shop?category=Retro%20Kit",
  },
];

export default function Collections() {
  return (
    <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#034694]">Shop by collection</p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">Find the shirt you came for.</h2>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-[#034694] hover:underline">
            Browse every team <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link key={collection.number} to={collection.to} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#eeece5]">
                <img src={collection.image} alt={collection.alt} className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.04]" />
                <span className="absolute left-3 top-3 bg-white/95 px-2.5 py-1.5 text-[10px] font-extrabold tracking-widest text-slate-500">{collection.number}</span>
                <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-white text-slate-800 transition group-hover:bg-[#034694] group-hover:text-white"><ArrowUpRight size={17} /></span>
              </div>
              <div className="mt-4 border-b border-slate-200 pb-4 transition-colors group-hover:border-[#034694]">
                <h3 className="font-bold text-slate-900">{collection.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{collection.detail}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
