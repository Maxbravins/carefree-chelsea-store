import { useState } from "react";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";
import api from "../api/api";
import { ShieldCheck, CheckCircle2, PhoneCall, CreditCard, ArrowLeft, Sparkles, AlertCircle } from "lucide-react";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();

  const [customer, setCustomer] = useState({
    customer_name: "",
    phone: "",
    county: "Nairobi",
    town: "",
    landmark: "",
    payment_method: "mpesa",
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [completedOrder, setCompletedOrder] = useState(null);

  const kenyaCounties = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu", "Eldoret / Uasin Gishu",
    "Machakos", "Kajiado", "Nyeri", "Meru", "Kilifi", "Kakamega", "Kericho", "Bomet", "Trans Nzoia"
  ];

  const delivery = subtotal >= 5000 ? 0 : 300;
  const total = subtotal + delivery;

  function handleChange(e) {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  }

  async function handleCheckout(e) {
    e.preventDefault();
    setErrorMessage("");

    if (items.length === 0) {
      setErrorMessage("Your cart is empty. Please add items before checking out.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        customer_name: customer.customer_name,
        phone: customer.phone,
        county: customer.county,
        town: customer.town,
        landmark: customer.landmark || null,
        payment_method: customer.payment_method,

        items: items.map((item) => ({
          product_id: item.id,
          size: item.size,
          custom_name: item.custom_name || null,
          custom_number: item.custom_number || null,
        })),
      };

      const response = await api.post("/orders", payload);

      if (response.data && response.data.order) {
        setCompletedOrder(response.data.order);
        clearCart();
      } else {
        throw new Error("Invalid response format from server.");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Unable to connect to the backend server. Make sure Laravel API is active.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Success Confirmation Screen
  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={48} />
          </div>

          <div>
            <span className="bg-emerald-100 text-emerald-800 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              Order Verified & Database Updated
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-2">Order Confirmed!</h1>
            <p className="text-slate-500 text-sm mt-1">
              Thank you, <strong className="text-slate-800">{completedOrder.customer_name}</strong>! Your order has been placed and logged in both the database and admin panel.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-500">Order Reference:</span>
              <span className="font-mono font-bold text-blue-900">#ORD-{completedOrder.id}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-500">Payment Status:</span>
              <span className="font-bold text-emerald-600 uppercase">{completedOrder.status}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-500">Receipt Code:</span>
              <span className="font-mono font-bold text-slate-800">{completedOrder.payment?.mpesa_receipt || 'CFC' + completedOrder.id}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-500">Delivery Address:</span>
              <span className="font-semibold text-slate-800">{completedOrder.town}, {completedOrder.county}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-slate-500">Total Paid:</span>
              <span className="font-black text-sm text-blue-950">KSh {Number(completedOrder.total).toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/shop"
              className="flex-1 bg-blue-900 hover:bg-blue-950 text-white font-extrabold py-3.5 rounded-2xl text-sm transition"
            >
              Continue Shopping
            </Link>

            <a
              href="http://127.0.0.1:8000/admin/orders"
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 rounded-2xl text-sm transition"
            >
              View in Admin Dashboard ↗
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Checkout Form */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-900">Secure Delivery</span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Customer Checkout</h1>
        </div>

        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-sm font-bold flex items-center gap-2">
            <AlertCircle size={18} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleCheckout} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">1. Contact & Shipping Address</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                <input
                  required
                  type="text"
                  name="customer_name"
                  value={customer.customer_name}
                  onChange={handleChange}
                  placeholder="e.g. John Didier"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number (M-Pesa) *</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleChange}
                  placeholder="07XXXXXXXX or 2547XXXXXXXX"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">County *</label>
                <select
                  name="county"
                  value={customer.county}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                  {kenyaCounties.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Town / Estate *</label>
                <input
                  required
                  type="text"
                  name="town"
                  value={customer.town}
                  onChange={handleChange}
                  placeholder="e.g. Westlands, Kilimani, Nakuru CBD"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Nearest Landmark (Optional)</label>
              <input
                type="text"
                name="landmark"
                value={customer.landmark}
                onChange={handleChange}
                placeholder="e.g. Near Quickmart, opposite Shell Station..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">2. Payment Method</h2>

            <div className="grid sm:grid-cols-2 gap-3">
              <label
                onClick={() => setCustomer({ ...customer, payment_method: 'mpesa' })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                  customer.payment_method === 'mpesa'
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <PhoneCall size={16} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">M-Pesa Instant Pay</div>
                  <p className="text-xs text-slate-500 mt-0.5">Safaricom STK Push prompt to phone</p>
                </div>
              </label>

              <label
                onClick={() => setCustomer({ ...customer, payment_method: 'cash' })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                  customer.payment_method === 'cash'
                    ? 'border-blue-900 bg-blue-50/50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CreditCard size={16} />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Pay on Delivery / Card</div>
                  <p className="text-xs text-slate-500 mt-0.5">Pay via rider POS or cash on arrival</p>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || items.length === 0}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white py-4 rounded-2xl font-extrabold text-base shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 active:scale-98"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing Order & DB Sync...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={20} />
                <span>Place Order & Pay KSh {total.toLocaleString()}</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Summary Sidebar */}
      <div>
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm sticky top-28 space-y-6">
          <h2 className="text-xl font-black text-slate-900">Order Summary</h2>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="text-slate-500 mt-0.5">
                    Size: <span className="font-semibold text-slate-800">{item.size}</span> × {item.quantity}
                  </p>
                  {(item.custom_name || item.custom_number) && (
                    <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
                      Printed: {item.custom_name || ""} #{item.custom_number || ""}
                    </span>
                  )}
                </div>

                <span className="font-extrabold text-slate-900">
                  KSh {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-2 text-xs font-medium text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">KSh {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold">
                {delivery === 0 ? <span className="text-emerald-600">FREE</span> : `KSh ${delivery}`}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xl font-black text-slate-900">
            <span>Total</span>
            <span className="text-2xl text-blue-950">KSh {total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}