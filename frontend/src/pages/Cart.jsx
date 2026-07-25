import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { Trash2, ShoppingBag, ArrowRight, Sparkles, Truck, ShieldCheck } from "lucide-react";

export default function Cart() {
  const { items, removeItem, subtotal, increaseQuantity, decreaseQuantity } = useCart();

  const deliveryThreshold = 5000;
  const delivery = subtotal >= deliveryThreshold ? 0 : 300;
  const total = subtotal + delivery;
  const freeDeliveryProgress = Math.min(100, (subtotal / deliveryThreshold) * 100);
  const remainingForFreeDelivery = deliveryThreshold - subtotal;

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-6 max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag size={36} />
        </div>

        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Cart is Empty</h1>
          <p className="text-slate-500 text-sm mt-2">
            Looks like you haven't added any official Chelsea jerseys to your kit bag yet.
          </p>
        </div>

        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white px-8 py-4 rounded-2xl font-extrabold text-sm shadow-lg hover:shadow-xl transition"
        >
          <span>Explore Chelsea Catalog</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Cart Items List */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-900">Your Kit Bag</span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Shopping Cart</h1>
          </div>
          <span className="text-sm font-bold text-slate-500">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-2 text-slate-800">
              <Truck size={16} className="text-amber-500" />
              {delivery === 0 ? (
                <span className="text-emerald-600 font-extrabold">🎉 You unlocked FREE Express Delivery!</span>
              ) : (
                <span>Add KSh {remainingForFreeDelivery.toLocaleString()} more for FREE Delivery!</span>
              )}
            </span>
            <span className="text-slate-400">{Math.round(freeDeliveryProgress)}%</span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 transition-all duration-500"
              style={{ width: `${freeDeliveryProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-4">
          {items.map((item, index) => {
            const itemImage = item.image_url || item.image || "/images/chelsea-home.jpg";
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col sm:flex-row gap-5 items-center justify-between shadow-sm hover:shadow-md transition"
              >
                <div className="flex gap-4 items-center w-full sm:w-auto">
                  <img
                    src={itemImage}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-50"
                  />

                  <div className="space-y-1">
                    <h2 className="font-extrabold text-slate-900 text-base">
                      {item.name}
                    </h2>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded-lg">
                        Size: {item.size}
                      </span>
                      {item.category && (
                        <span className="bg-blue-50 text-blue-900 font-bold px-2.5 py-0.5 rounded-lg">
                          {item.category}
                        </span>
                      )}
                    </div>

                    {(item.custom_name || item.custom_number) && (
                      <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 text-xs font-bold px-3 py-1 rounded-xl border border-amber-200 mt-1">
                        <Sparkles size={12} className="text-amber-500" />
                        <span>Print: {item.custom_name || ""} #{item.custom_number || ""}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {/* Quantity Modifier */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                    <button
                      onClick={() => decreaseQuantity(index)}
                      className="px-3 py-1.5 text-slate-600 font-bold hover:bg-slate-200 rounded-l-xl transition"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-extrabold text-slate-900">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(index)}
                      className="px-3 py-1.5 text-slate-600 font-bold hover:bg-slate-200 rounded-r-xl transition"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-black text-blue-950">
                      KSh {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => removeItem(index)}
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <div>
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm sticky top-28 space-y-6">
          <h2 className="text-xl font-black text-slate-900">Order Summary</h2>

          <div className="space-y-3 text-sm font-medium text-slate-600 border-b border-slate-100 pb-5">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">KSh {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Express Delivery</span>
              <span className="font-bold">
                {delivery === 0 ? (
                  <span className="text-emerald-600">FREE</span>
                ) : (
                  `KSh ${delivery}`
                )}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-xl font-black text-slate-900">
            <span>Total Amount</span>
            <span className="text-2xl text-blue-950">KSh {total.toLocaleString()}</span>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (e.g. CHELSEA10)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold uppercase focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
              <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 rounded-xl transition">
                Apply
              </button>
            </div>

            <Link
              to="/checkout"
              className="block w-full text-center bg-blue-900 hover:bg-blue-950 text-white py-4 rounded-2xl font-extrabold text-base shadow-lg hover:shadow-xl transition active:scale-98"
            >
              Proceed to Checkout →
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>M-Pesa STK Push Secured • 100% Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
}