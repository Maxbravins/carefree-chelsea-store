import { Search, SlidersHorizontal, Shirt } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TeamCard from "../components/TeamCard";
import { getProducts } from "../services/productService";
import { getTeamName, getTeamType, groupProductsByTeam, normalizeTeamName } from "../utils/teams";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [search, setSearch] = useState("");
  const typeParam = searchParams.get("type");
  const teamType = typeParam === "club" || typeParam === "national" ? typeParam : "all";
  const [team, setTeam] = useState("All teams");
  const category = searchParams.get("category") || "All kits";
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    let active = true;
    getProducts().then((data) => { if (active) setProducts(Array.isArray(data) ? data : []); })
      .catch((error) => { console.error("Unable to load products:", error); if (active) setLoadError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    setTeam("All teams");
    setSearch("");
  }, [teamType]);

  const teams = useMemo(() => {
    const uniqueTeams = new Map();
    products
      .filter((product) => teamType === "all" || getTeamType(product) === teamType)
      .forEach((product) => {
        const name = getTeamName(product);
        const key = normalizeTeamName(name);
        if (!uniqueTeams.has(key)) uniqueTeams.set(key, name);
      });
    return ["All teams", ...[...uniqueTeams.values()].sort((a, b) => a.localeCompare(b))];
  }, [products, teamType]);
  const categories = useMemo(() => ["All kits", ...new Set(products.map((product) => product.category).filter(Boolean).sort())], [products]);

  const filteredProducts = useMemo(() => {
    let items = products.filter((product) => {
      const productTeam = getTeamName(product);
      const kind = getTeamType(product);
      const term = search.trim().toLowerCase();
      return (teamType === "all" || kind === teamType)
        && (team === "All teams" || normalizeTeamName(productTeam) === normalizeTeamName(team))
        && (category === "All kits" || product.category === category)
        && (!term || `${product.name} ${productTeam} ${product.category || ""}`.toLowerCase().includes(term));
    });
    if (sort === "price-low") items.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") items.sort((a, b) => b.price - a.price);
    else if (sort === "name") items.sort((a, b) => a.name.localeCompare(b.name));
    else items.sort((a, b) => b.id - a.id);
    return items;
  }, [products, teamType, team, category, search, sort]);

  const teamCollections = useMemo(() => {
    const items = groupProductsByTeam(filteredProducts);
    if (sort === "price-low") items.sort((a, b) => Math.min(...a.products.map((p) => p.price)) - Math.min(...b.products.map((p) => p.price)));
    else if (sort === "price-high") items.sort((a, b) => Math.max(...b.products.map((p) => p.price)) - Math.max(...a.products.map((p) => p.price)));
    else if (sort === "name") items.sort((a, b) => a.teamName.localeCompare(b.teamName));
    else items.sort((a, b) => Math.max(...b.products.map((p) => p.id)) - Math.max(...a.products.map((p) => p.id)));
    return items;
  }, [filteredProducts, sort]);

  function changeTeamType(value) {
    const nextParams = new URLSearchParams(searchParams);
    if (value === "all") nextParams.delete("type");
    else nextParams.set("type", value);
    setTeam("All teams");
    setSearch("");
    setSearchParams(nextParams);
  }

  function changeCategory(value) {
    const nextParams = new URLSearchParams(searchParams);
    if (value === "All kits") nextParams.delete("category");
    else nextParams.set("category", value);
    setSearchParams(nextParams);
  }

  return <div className="min-h-screen bg-[#f8f7f3]">
    <section className="border-b border-slate-200 bg-[#f2f0e9] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#034694]"><Shirt size={15} /> The collection</p>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-[#111820] sm:text-5xl">Find your next shirt.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">Club colours, national pride, and the shirts that bring fans together.</p>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Delivery across Kenya</p>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-7 border-y border-slate-200 bg-white p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className="relative sm:col-span-2 lg:col-span-2"><span className="sr-only">Search jerseys</span><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by team, country or shirt..." className="w-full border border-slate-300 bg-[#f8f7f3] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#034694]" /></label>
          <label><span className="sr-only">Filter by team type</span><select value={teamType} onChange={(event) => changeTeamType(event.target.value)} className="w-full border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#034694]"><option value="all">Club &amp; country</option><option value="club">Club jerseys</option><option value="national">National teams</option></select></label>
          <label><span className="sr-only">Filter by team</span><select value={team} onChange={(event) => setTeam(event.target.value)} className="w-full border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#034694]">{teams.map((name) => <option key={name}>{name}</option>)}</select></label>
          <label><span className="sr-only">Filter by kit type</span><select value={category} onChange={(event) => changeCategory(event.target.value)} className="w-full border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#034694]">{categories.map((name) => <option key={name}>{name}</option>)}</select></label>
        </div>
        <div className="mt-3 flex items-center gap-2 sm:justify-end"><SlidersHorizontal size={16} className="text-slate-500" /><label className="sr-only" htmlFor="product-sort">Sort teams</label><select id="product-sort" value={sort} onChange={(event) => setSort(event.target.value)} className="bg-transparent py-2 text-sm font-semibold text-slate-600 outline-none"><option value="latest">Recently added</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Team name: A–Z</option></select></div>
      </div>
      <div className="mb-5"><p className="text-sm font-semibold text-slate-600">{loading ? "Finding teams…" : `${teamCollections.length} ${teamCollections.length === 1 ? "team" : "teams"} · ${filteredProducts.length} ${filteredProducts.length === 1 ? "jersey" : "jerseys"}`}</p></div>
      {loading ? <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">{Array.from({ length: 8 }, (_, i) => <div key={i} className="overflow-hidden rounded-2xl bg-white"><div className="aspect-square animate-pulse bg-slate-200" /><div className="space-y-3 p-4"><div className="h-4 animate-pulse rounded bg-slate-200" /><div className="h-10 animate-pulse rounded bg-slate-100" /></div></div>)}</div>
        : loadError ? <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center"><h2 className="text-2xl font-black">The jersey rack is unavailable</h2><p className="mt-2 text-slate-600">Please try again in a little while.</p></div>
        : teamCollections.length ? <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">{teamCollections.map((teamCollection) => <TeamCard key={`${teamCollection.teamType}:${teamCollection.teamName}`} team={teamCollection} />)}</div>
        : <div className="border border-slate-200 bg-white px-6 py-16 text-center"><h2 className="font-serif text-2xl font-bold">No shirts match those filters</h2><p className="mt-2 text-slate-600">Try another team, country or kit type.</p><button onClick={() => { setSearch(""); setTeam("All teams"); setSearchParams({}, { replace: true }); }} className="mt-5 border-b border-[#034694] font-bold text-[#034694] hover:border-transparent">Clear filters</button></div>}
    </section>
  </div>;
}
