import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["All", ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let items = [...products];

    if (category !== "All") {
      items = items.filter((p) => p.category === category);
    }

    if (search) {
      items = items.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    switch (sort) {
      case "price-low":
        items.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        items.sort((a, b) => b.price - a.price);
        break;

      case "name":
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        items.sort((a, b) => b.id - a.id);
    }

    return items;
  }, [products, category, search, sort]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}

      <section className="bg-[#034694] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Chelsea Store
          </h1>

          <p className="text-blue-100 mt-4 text-sm sm:text-base">
            Official Jerseys • Training Wear • Retro Kits
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Search */}

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border focus:ring-2 focus:ring-[#034694] outline-none"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-xl px-4 py-4 bg-white outline-none focus:ring-2 focus:ring-[#034694]"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <div className="flex items-center gap-3">
            <SlidersHorizontal />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border rounded-xl px-4 py-4"
            >
              <option value="latest">Latest</option>

              <option value="price-low">Price: Low to High</option>

              <option value="price-high">Price: High to Low</option>

              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Products */}

        {loading ? (
          <div className="text-center py-20 text-xl">Loading products...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold">No Products Found</h2>

            <p className="text-gray-500 mt-3">
              Try another search or category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
