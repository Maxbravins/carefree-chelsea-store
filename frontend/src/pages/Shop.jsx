import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { Search, Filter } from "lucide-react";

export default function Shop() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Home Kit", "Away Kit", "Third Kit", "Retro Kit", "Training", "Special Edition"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                          (product.description && product.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-900">Official Store</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Chelsea Kit Collection
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Explore authentic match kits, retro champions editions, and training wear.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search kit by name or season..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1 shrink-0">
          <Filter size={14} /> Filter:
        </span>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === category
                ? "bg-blue-900 text-white shadow-md shadow-blue-900/20"
                : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full mb-3"></div>
          <p className="text-slate-500 font-semibold text-sm">Fetching catalog from database...</p>
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 rounded-3xl text-center">
          <p className="font-bold">{error}</p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
              <h3 className="text-xl font-bold text-slate-800">No jerseys match your filter</h3>
              <p className="text-slate-500 text-sm">Try clearing your search term or switching categories.</p>
              <button
                onClick={() => { setSearch(""); setSelectedCategory("All"); }}
                className="px-5 py-2.5 bg-blue-900 text-white rounded-xl text-xs font-bold shadow hover:bg-blue-950 transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}