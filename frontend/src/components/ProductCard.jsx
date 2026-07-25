import { Link } from "react-router-dom";
import { ShoppingBag, Star, Zap } from "lucide-react";
import { useCart } from "../CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const imageUrl = product.image_url || product.image || "/images/chelsea-home.jpg";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        <Link to={`/product/${product.slug}`} className="block relative overflow-hidden bg-slate-100 aspect-square">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
          />
          {product.category && (
            <span className="absolute top-3 left-3 bg-blue-900/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
              {product.category}
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
              <Zap size={10} /> Only {product.stock} Left!
            </span>
          )}
        </Link>

        <div className="p-5">
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-1">
            <Star size={14} fill="currentColor" />
            <span>4.9</span>
            <span className="text-slate-400 font-normal">(Official Nike Gear)</span>
          </div>

          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-700 transition line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {product.description || "Official Chelsea Football Club jersey."}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 flex justify-between items-center mt-2 border-t border-slate-100">
        <div>
          <span className="text-xs text-slate-400 block font-medium">Price</span>
          <span className="text-xl font-extrabold text-blue-900">
            KSh {Number(product.price).toLocaleString()}
          </span>
        </div>

        <button
          onClick={() =>
            addItem({
              ...product,
              size: "M",
              quantity: 1,
            })
          }
          className="bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition active:scale-95"
        >
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}