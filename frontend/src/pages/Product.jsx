import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import useProduct from "../hooks/useProduct";
import { useCart } from "../CartContext";
import { ShoppingBag, ShieldCheck, Truck, ArrowLeft, Check, Sparkles } from "lucide-react";

export default function Product() {
  const { slug } = useParams();
  const { product, loading, error } = useProduct(slug);
  const { addItem } = useCart();

  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const [addedToast, setAddedToast] = useState(false);

  if (loading) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div className="inline-block animate-spin w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full mb-3"></div>
        <p className="text-slate-500 font-semibold text-sm">Loading jersey details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 p-8 space-y-4">
        <h2 className="text-2xl font-extrabold text-slate-900">Product Not Found</h2>
        <p className="text-slate-500 text-sm">The jersey you are looking for might have been removed or updated.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-xl font-bold text-sm">
          <ArrowLeft size={16} /> Return to Shop
        </Link>
      </div>
    );
  }

  const imageUrl = product.image_url || product.image || "/images/chelsea-home.jpg";

  function handleAddToCart() {
    addItem({
      ...product,
      quantity,
      size,
      custom_name: customName.trim() || null,
      custom_number: customNumber.trim() || null,
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  }

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-900 transition">
        <ArrowLeft size={16} /> Back to Catalog
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10">
        {/* Image Preview */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-square border border-slate-200 shadow-inner group">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          {product.category && (
            <span className="absolute top-4 left-4 bg-blue-900 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
              {product.category}
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest block">
              Official Chelsea Apparel
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              {product.name}
            </h1>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              {product.description || "Official Chelsea Football Club jersey with premium Dri-FIT performance fabric."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Price</span>
              <span className="text-3xl font-black text-blue-950">
                KSh {Number(product.price).toLocaleString()}
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 font-medium block">Availability</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                product.stock > 0 ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
              }`}>
                {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-slate-900">Select Size</h3>
              <span className="text-xs text-slate-400 font-semibold">UK Standard Fit</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL", "XXL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 rounded-xl text-sm font-extrabold border transition ${
                    size === s
                      ? "bg-blue-900 text-white border-blue-900 shadow-md"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Jersey Name & Number Printing */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 space-y-4">
            <div className="flex items-center gap-2 text-blue-950 font-bold text-sm">
              <Sparkles size={16} className="text-amber-500" />
              <span>Custom Official Printing (Optional)</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Back Name</label>
                <input
                  type="text"
                  placeholder="e.g. PALMER"
                  maxLength={15}
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm uppercase font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Shirt Number</label>
                <input
                  type="text"
                  placeholder="e.g. 20"
                  maxLength={3}
                  value={customNumber}
                  onChange={(e) => setCustomNumber(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm uppercase font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
            </div>
          </div>

          {/* Quantity selector & Add to cart */}
          <div className="flex gap-4">
            <div className="flex items-center border border-slate-200 rounded-xl bg-white">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="px-4 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-l-xl transition"
              >
                -
              </button>
              <span className="px-4 text-base font-extrabold text-slate-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-r-xl transition"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="flex-1 bg-blue-900 hover:bg-blue-950 disabled:bg-slate-300 text-white font-extrabold text-base py-4 rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 active:scale-98"
            >
              <ShoppingBag size={20} />
              <span>Add To Cart</span>
            </button>
          </div>

          {addedToast && (
            <div className="bg-emerald-600 text-white font-bold text-sm px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg animate-fade-in">
              <Check size={18} /> Added {quantity} × {product.name} ({size}) to cart!
            </div>
          )}

          {/* Delivery & Warranty */}
          <div className="pt-4 border-t border-slate-100 grid sm:grid-cols-2 gap-4 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-blue-900" />
              <span>{product.delivery_estimate || "Ships within 2-4 business days"}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>100% Guaranteed Official Jersey</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}