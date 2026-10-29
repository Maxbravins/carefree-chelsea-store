import { Search, SlidersHorizontal, Shirt } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [search, setSearch] = useState("");
  const [teamType, setTeamType] = useState("all");
  const [team, setTeam] = useState("All teams");
  const [category, setCategory] = useState("All kits");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    let active = true;
    getProducts().then((data) => { if (active) setProducts(Array.isArray(data) ? data : []); })
      .catch((error) => { console.error("Unable to load products:", error); if (active) setLoadError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const teams = useMemo(() => ["All teams", ...new Set(products
    .filter((product) => teamType === "all" || (product.team_type || "club") === teamType)
    .map((product) => product.team || "Chelsea").filter(Boolean).sort((a, b) => a.localeCompare(b))
  )], [products, teamType]);
  const categories = useMemo(() => ["All kits", ...new Set(products.map((product) => product.category).filter(Boolean).sort())], [products]);

  const filteredProducts = useMemo(() => {
    let items = products.filter((product) => {
      const productTeam = product.team || "Chelsea";
      const kind = product.team_type || "club";
      const term = search.trim().toLowerCase();
      return (teamType === "all" || kind === teamType)
        && (team === "All teams" || productTeam === team)
        && (category === "All kits" || product.category === category)
        && (!term || `${product.name} ${productTeam} ${product.category || ""}`.toLowerCase().includes(term));
    });
    if (sort === "price-low") items.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") items.sort((a, b) => b.price - a.price);
    else if (sort === "name") items.sort((a, b) => a.name.localeCompare(b.name));
    else items.sort((a, b) => b.id - a.id);
    return items;
  }, [products, teamType, team, category, search, sort]);

  function changeTeamType(value) { setTeamType(value); setTeam("All teams"); }

  return <div className="min-h-screen bg-slate-50">
    <section className="relative overflow-hidden bg-[#071a35] py-16 sm:py-20">
      <div className="absolute -right-16 -top-28 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-100"><Shirt size={15} /> For every supporter</span>
        <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-6xl">The Jersey Room</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-blue-100 sm:text-lg">Club colours, national pride, and the shirts that bring fans together.</p>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className="relative sm:col-span-2 lg:col-span-2"><span className="sr-only">Search jerseys</span><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a team, country or jersey..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#034694] focus:ring-2 focus:ring-blue-100" /></label>
          <label><span className="sr-only">Filter by team type</span><select value={teamType} onChange={(event) => changeTeamType(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#034694]"><option value="all">Club &amp; country</option><option value="club">Club jerseys</option><option value="national">National teams</option></select></label>
          <label><span className="sr-only">Filter by team</span><select value={team} onChange={(event) => setTeam(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#034694]">{teams.map((name) => <option key={name}>{name}</option>)}</select></label>
          <label><span className="sr-only">Filter by kit type</span><select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#034694]">{categories.map((name) => <option key={name}>{name}</option>)}</select></label>
        </div>
        <div className="mt-3 flex items-center gap-2 sm:justify-end"><SlidersHorizontal size={16} className="text-slate-500" /><label className="sr-only" htmlFor="product-sort">Sort jerseys</label><select id="product-sort" value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg bg-transparent py-2 text-sm font-semibold text-slate-600 outline-none"><option value="latest">Newest arrivals</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Team name: A–Z</option></select></div>
      </div>
      <div className="mb-5"><p className="text-sm font-semibold text-slate-600">{loading ? "Finding jerseys…" : `${filteredProducts.length} ${filteredProducts.length === 1 ? "jersey" : "jerseys"}`}</p></div>
      {loading ? <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">{Array.from({ length: 8 }, (_, i) => <div key={i} className="overflow-hidden rounded-2xl bg-white"><div className="aspect-square animate-pulse bg-slate-200" /><div className="space-y-3 p-4"><div className="h-4 animate-pulse rounded bg-slate-200" /><div className="h-10 animate-pulse rounded bg-slate-100" /></div></div>)}</div>
        : loadError ? <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center"><h2 className="text-2xl font-black">The jersey rack is unavailable</h2><p className="mt-2 text-slate-600">Please try again in a little while.</p></div>
        : filteredProducts.length ? <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        : <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center"><h2 className="text-2xl font-black">No jerseys match those filters</h2><p className="mt-2 text-slate-600">Try another team, country or kit type.</p><button onClick={() => { setSearch(""); setTeamType("all"); setTeam("All teams"); setCategory("All kits"); }} className="mt-5 font-bold text-[#034694] hover:underline">Clear filters</button></div>}
    </section>
  </div>;
}
