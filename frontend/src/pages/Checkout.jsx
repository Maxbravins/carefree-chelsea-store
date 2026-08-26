import { CreditCard, ShieldCheck, Truck, Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import api from "../api/api";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();

  const [step, setStep] = useState(1); // 1 = Shipping, 2 = Review & Pay
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customer_name: "",
    email: "",
    phone: "",
    county: "",
    town: "",
    address: "",
  });

  const deliveryFee = totalPrice >= 5000 ? 0 : 300;
  const grandTotal = totalPrice + deliveryFee;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleContinue(e) {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handlePlaceOrder() {
    setLoading(true);

    try {
      const items = cart.flatMap((item) =>
        Array.from({ length: item.quantity }, () => ({
          product_id: item.id,
          size: item.size || "M",
        })),
      );

      await api.post("/orders", {
        ...form,
        payment_method: "mpesa",
        items,
      });

      clearCart();
      navigate("/success");
      toast.success("Order placed successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place the order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
          Secure Checkout
        </h1>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-10 text-sm font-semibold">
          <span className={step === 1 ? "text-[#034694]" : "text-gray-400"}>
            1. Shipping
          </span>
          <span className="text-gray-300">→</span>
          <span className={step === 2 ? "text-[#034694]" : "text-gray-400"}>
            2. Review & Pay
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* STEP 1: Shipping */}
            {step === 1 && (
              <form
                onSubmit={handleContinue}
                className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10"
              >
                <h2 className="text-3xl font-black mb-10">
                  Delivery Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    name="customer_name"
                    placeholder="Full Name"
                    required
                    value={form.customer_name}
                    onChange={handleChange}
                    className="border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#034694]"
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Email (for order confirmation)"
                    value={form.email}
                    onChange={handleChange}
                    className="border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#034694]"
                  />

                  <input
                    name="phone"
                    placeholder="07XXXXXXXX"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#034694]"
                  />

                  <input
                    name="county"
                    placeholder="County"
                    required
                    value={form.county}
                    onChange={handleChange}
                    className="border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#034694]"
                  />

                  <input
                    name="town"
                    placeholder="Town"
                    required
                    value={form.town}
                    onChange={handleChange}
                    className="border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#034694]"
                  />
                </div>

                <textarea
                  name="address"
                  rows="4"
                  placeholder="Delivery Address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  className="w-full mt-6 border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#034694]"
                />

                <button
                  type="submit"
                  className="mt-10 w-full bg-[#034694] hover:bg-[#012A57] text-white py-5 rounded-xl text-lg font-bold transition"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {/* STEP 2: Review & Pay */}
            {step === 2 && (
              <div className="space-y-6">
                {/* Shipping summary, editable */}
                <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-black">Shipping Address</h2>
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1 text-sm font-semibold text-[#034694] hover:underline"
                    >
                      <Pencil size={14} /> Edit
                    </button>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {form.customer_name}
                    <br />
                    {form.phone} {form.email && `• ${form.email}`}
                    <br />
                    {form.address}
                    <br />
                    {form.town}, {form.county}
                  </p>
                </div>

                {/* Items in this order */}
                <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
                  <h2 className="text-xl font-black mb-6">Items</h2>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-gray-500">
                            Size {item.size || "M"} · Qty {item.quantity}
                          </p>
                        </div>
                        <span className="font-bold">
                          KES {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment method */}
                <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
                  <h2 className="text-xl font-black mb-6">Payment</h2>
                  <div className="flex items-center gap-4 border-2 border-[#034694] bg-blue-50 rounded-2xl p-6">
                    <CreditCard className="text-[#034694]" />
                    <div>
                      <h3 className="font-bold">M-Pesa</h3>
                      <p className="text-gray-600 mt-1 text-sm">
                        After placing your order you'll receive an M-Pesa STK
                        Push on your phone to complete payment.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="mt-8 w-full bg-[#034694] hover:bg-[#012A57] text-white py-5 rounded-xl text-lg font-bold transition"
                  >
                    {loading ? "Processing..." : "Complete Order"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary sidebar (always visible) */}
          <div>
            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24">
              <h2 className="text-3xl font-black">Order Summary</h2>

              <div className="space-y-6 mt-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span>
                      KES {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="my-8" />

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>KES {totalPrice.toLocaleString()}</span>
              </div>

              <div className="flex justify-between mt-4">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? "FREE" : `KES ${deliveryFee}`}</span>
              </div>

              <div className="flex justify-between text-3xl font-black mt-10">
                <span>Total</span>
                <span>KES {grandTotal.toLocaleString()}</span>
              </div>

              <div className="mt-10 space-y-5">
                <div className="flex gap-3">
                  <Truck className="text-green-600" />
                  <span>Nationwide Delivery</span>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="text-green-600" />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}