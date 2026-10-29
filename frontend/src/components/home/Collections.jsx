import { ArrowRight, Flag, Globe2, Shield, Shirt } from "lucide-react";
import { Link } from "react-router-dom";

const collections = [
  { title: "Club Jerseys", description: "Represent your club on matchday and beyond.", label: "Club football", icon: Shield, tone: "from-blue-950 to-blue-700" },
  { title: "National Teams", description: "Wear your country's colours with pride.", label: "International football", icon: Flag, tone: "from-emerald-950 to-emerald-700" },
  { title: "Home & Away Kits", description: "The latest home, away and third shirts.", label: "New season", icon: Shirt, tone: "from-slate-950 to-slate-700" },
  { title: "Retro & Classics", description: "Classic shirts from unforgettable eras.", label: "Fan favourites", icon: Globe2, tone: "from-amber-950 to-orange-700" },
];

export default function Collections() {
  return <section className="bg-white py-20 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6">
    <div className="mb-10 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#034694]">Find your colours</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">A shirt for every side</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">From your club to your country, find the jersey you want to wear.</p></div><Link to="/shop" className="inline-flex w-fit items-center gap-2 font-bold text-[#034694] hover:gap-3">Explore all jerseys <ArrowRight size={18} /></Link></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{collections.map(({ title, description, label, icon: Icon, tone }) => <Link key={title} to="/shop" className={`group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br ${tone} p-6 text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl`}><div className="absolute -right-9 -top-9 h-40 w-40 rounded-full border border-white/10 transition-transform duration-500 group-hover:scale-125" /><div className="relative flex items-start justify-between"><span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest">{label}</span><Icon size={23} className="text-white/80" /></div><div className="relative"><h3 className="text-2xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-white/75">{description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Browse collection <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span></div></Link>)}</div>
  </div></section>;
}
