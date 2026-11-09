import { ArrowLeft, Flag, Shield } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import { getTeamName, getTeamType, normalizeTeamName, slugifyTeam } from "../utils/teams";

export default function TeamCollection() {
  const { teamType, teamSlug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    getProducts()
      .then((data) => { if (active) setProducts(Array.isArray(data) ? data : []); })
      .catch((error) => {
        console.error("Unable to load team jerseys:", error);
        if (active) setLoadError(true);
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const teamProducts = useMemo(() => products.filter((product) =>
    getTeamType(product) === teamType && slugifyTeam(getTeamName(product)) === teamSlug,
  ), [products, teamType, teamSlug]);

  const teamName = teamProducts.length ? getTeamName(teamProducts[0]) : "Team";
  const TeamIcon = teamType === "national" ? Flag : Shield;

  return (
    <section className="min-h-[70vh] bg-[#f8f7f3] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Link to="/shop" className="inline-flex items-center gap-2 font-bold text-[#034694] hover:underline">
          <ArrowLeft size={17} /> All teams
        </Link>

        {loading ? (
          <p className="py-20 text-center font-semibold text-slate-500">Loading jerseys…</p>
        ) : loadError ? (
          <div className="py-20 text-center">
            <h1 className="text-2xl font-black text-slate-900">The jerseys could not load</h1>
            <p className="mt-2 text-slate-600">Please try again shortly.</p>
          </div>
        ) : teamProducts.length ? (
          <>
            <header className="mb-8 mt-8 border-y border-slate-300 py-8 sm:py-10">
              <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#034694]">
                <TeamIcon size={15} /> {teamType === "national" ? "National team collection" : "Club collection"}
              </p>
              <h1 className="mt-3 font-serif text-3xl font-bold text-[#111820] sm:text-5xl">{teamName} jerseys</h1>
              <p className="mt-3 text-slate-600">Browse the home, away and other jerseys available for this team.</p>
            </header>
            <p className="mb-5 text-sm font-semibold text-slate-600">
              {teamProducts.length} {teamProducts.length === 1 ? "jersey" : "jerseys"}
            </p>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {teamProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </>
        ) : (
          <div className="py-20 text-center">
            <h1 className="text-2xl font-black text-slate-900">Team not found</h1>
            <p className="mt-2 text-slate-600">This team does not have any jerseys in the catalog yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
