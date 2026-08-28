import { CreditCard, ShieldCheck, Truck, Pencil, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import api from "../api/api";

const POLL_INTERVAL = 3000;
const MAX_POLL_ATTEMPTS = 60;

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentWaiting, setPaymentWaiting] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const pollTimerRef = useRef(null);
  const pollAttemptsRef = useRef(0);

  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem("carefree_customer_info");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Could not parse saved customer info:", e);
    }
    return {
      customer_name: "",
      email: "",
      phone: "",
      county: "",
      town: "",
      address: "",
    };
  });

  const deliveryFee = totalPrice >= 5000 ? 0 : 300;
  const grandTotal = totalPrice + deliveryFee;

  useEffect(() => {
    return () => {
      if (pollTimerRef.current) {
        clearTimeout(pollTimerRef.current);
      }
    };
  }, []);

  function handleChange(e) {
    const updated = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(updated);
    try {
      localStorage.setItem("carefree_customer_info", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save customer info to localStorage:", err);
    }
  }

  function handleContinue(e) {
    e.preventDefault();
    try {
      localStorage.setItem("carefree_customer_info", JSON.stringify(form));
    } catch (err) {
      console.error("Failed to save customer info to localStorage:", err);
    }
    setStep(2);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function checkPaymentStatus(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}/status`);

      const orderStatus = response.data?.order?.status;
      const paymentStatus = response.data?.payment?.status;

      if (
        orderStatus === "paid" ||
        paymentStatus === "success"
      ) {
        clearCart();
        navigate("/success", {
          state: {
            orderId,
            receipt: response.data?.payment?.mpesa_receipt || null,
          },
        });
        return;
      }

      if (
        orderStatus === "failed" ||
        paymentStatus === "failed"
      ) {
        setPaymentWaiting(false);
        setLoading(false);
        setPaymentError(
          "M-Pesa payment was not completed. Please try again."
        );
        toast.error("M-Pesa payment failed.");
        return;
      }

      pollAttemptsRef.current += 1;

      if (pollAttemptsRef.current >= MAX_POLL_ATTEMPTS) {
        setPaymentWaiting(false);
        setLoading(false);
        setPaymentError(
          "We could not confirm your payment yet. Please check your M-Pesa messages before trying again."
        );
        toast.error("Payment confirmation timed out.");
        return;
      }

      pollTimerRef.current = setTimeout(() => {
        checkPaymentStatus(orderId);
      }, POLL_INTERVAL);
    } catch (error) {
      console.error("Payment status check failed:", error);

      pollAttemptsRef.current += 1;

      if (pollAttemptsRef.current >= MAX_POLL_ATTEMPTS) {
        setPaymentWaiting(false);
        setLoading(false);
        setPaymentError(
          "We could not confirm your payment. Please try again."
        );
        toast.error("Unable to confirm payment.");
        return;
      }

      pollTimerRef.current = setTimeout(() => {
        checkPaymentStatus(orderId);
      }, POLL_INTERVAL);
    }
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

    const response = await api.post("/orders", {
      ...form,
      payment_method: "mpesa",
      items,
    });

    const orderId = response.data.order.id;

    toast.success("M-Pesa prompt sent. Enter your PIN on your phone.");

    // Wait for M-Pesa callback/payment confirmation.
    let paid = false;

    for (let attempt = 0; attempt < 30; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const statusResponse = await api.get(`/orders/${orderId}/status`);

      const orderStatus = statusResponse.data.order?.status;
      const paymentStatus = statusResponse.data.payment?.status;

      if (orderStatus === "paid" || paymentStatus === "success") {
        paid = true;
        break;
      }

      if (
        orderStatus === "failed" ||
        paymentStatus === "failed"
      ) {
        throw new Error("M-Pesa payment failed.");
      }
    }

    if (!paid) {
      toast.error(
        "Payment confirmation is taking longer than expected. Please check your M-Pesa message."
      );
      return;
    }

    clearCart();
    navigate("/success");
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        error.message ||
        "Failed to complete payment. Please try again.",
    );
  } finally {
    setLoading(false);
  }
}


  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="mb-4 text-4xl font-black leading-tight sm:text-5xl">
          Secure Checkout
        </h1>

        <div className="mb-10 flex items-center gap-3 text-sm font-semibold">
          <span
            className={
              step === 1 ? "text-[#034694]" : "text-gray-400"
            }
          >
            1. Shipping
          </span>

          <span className="text-gray-300">→</span>

          <span
            className={
              step === 2 ? "text-[#034694]" : "text-gray-400"
            }
          >
            2. Review & Pay
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {step === 1 && (
              <form
                onSubmit={handleContinue}
                className="rounded-3xl bg-white p-6 shadow-lg sm:p-8 lg:p-10"
              >
                <h2 className="mb-10 text-3xl font-black">
                  Delivery Information
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <input
                    name="customer_name"
                    placeholder="Full Name"
                    required
                    value={form.customer_name}
                    onChange={handleChange}
                    className="rounded-xl border px-5 py-4 outline-none focus:ring-2 focus:ring-[#034694]"
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Email (for order confirmation)"
                    value={form.email}
                    onChange={handleChange}
                    className="rounded-xl border px-5 py-4 outline-none focus:ring-2 focus:ring-[#034694]"
                  />

                  <input
                    name="phone"
                    placeholder="07XXXXXXXX"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="rounded-xl border px-5 py-4 outline-none focus:ring-2 focus:ring-[#034694]"
                  />

                  <input
                    name="county"
                    placeholder="County"
                    required
                    value={form.county}
                    onChange={handleChange}
                    className="rounded-xl border px-5 py-4 outline-none focus:ring-2 focus:ring-[#034694]"
                  />

                  <input
                    name="town"
                    placeholder="Town"
                    required
                    value={form.town}
                    onChange={handleChange}
                    className="rounded-xl border px-5 py-4 outline-none focus:ring-2 focus:ring-[#034694]"
                  />
                </div>

                <textarea
                  name="address"
                  rows="4"
                  placeholder="Delivery Address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  className="mt-6 w-full rounded-xl border px-5 py-4 outline-none focus:ring-2 focus:ring-[#034694]"
                />

                <button
                  type="submit"
                  className="mt-10 w-full rounded-xl bg-[#034694] py-5 text-lg font-bold text-white transition hover:bg-[#012A57]"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {paymentWaiting && (
                  <div className="rounded-3xl border-2 border-[#034694]/20 bg-blue-50 p-8 text-center shadow-lg">
                    <Loader2
                      size={48}
                      className="mx-auto animate-spin text-[#034694]"
                    />

                    <h2 className="mt-5 text-2xl font-black text-slate-900">
                      Complete Your M-Pesa Payment
                    </h2>

                    <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">
                      Check your phone for the M-Pesa prompt and
                      enter your M-Pesa PIN. We'll automatically
                      confirm your payment.
                    </p>

                    <div className="mt-5 inline-flex rounded-full bg-white px-5 py-2 text-xs font-bold text-[#034694] shadow-sm">
                      Waiting for payment confirmation...
                    </div>
                  </div>
                )}

                {paymentError && !paymentWaiting && (
                  <div className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm">
                    <h3 className="font-black text-red-800">
                      Payment Not Completed
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-red-700">
                      {paymentError}
                    </p>

                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      className="mt-5 rounded-xl bg-[#034694] px-6 py-3 font-bold text-white transition hover:bg-[#012A57]"
                    >
                      Try M-Pesa Again
                    </button>
                  </div>
                )}

                <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-black">
                      Shipping Address
                    </h2>

                    <button
                      onClick={() => setStep(1)}
                      disabled={loading}
                      className="flex items-center gap-1 text-sm font-semibold text-[#034694] hover:underline disabled:opacity-50"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                  </div>

                  <p className="leading-relaxed text-gray-700">
                    {form.customer_name}
                    <br />
                    {form.phone}{" "}
                    {form.email && `• ${form.email}`}
                    <br />
                    {form.address}
                    <br />
                    {form.town}, {form.county}
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
                  <h2 className="mb-6 text-xl font-black">
                    Items
                  </h2>

                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="flex items-center gap-4"
                      >
                        <img
                          src={
                            item.image_url ||
                            item.image ||
                            "/images/chelsea-home.jpg"
                          }
                          alt={item.name}
                          className="h-16 w-16 rounded-lg border object-cover"
                        />

                        <div className="flex-1">
                          <h4 className="font-semibold">
                            {item.name}
                          </h4>

                          <p className="text-sm text-gray-500">
                            Size {item.size || "M"} · Qty{" "}
                            {item.quantity}
                          </p>
                        </div>

                        <span className="font-bold">
                          KES{" "}
                          {(
                            item.price * item.quantity
                          ).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
                  <h2 className="mb-6 text-xl font-black">
                    Payment
                  </h2>

                  <div className="flex items-center gap-4 rounded-2xl border-2 border-[#034694] bg-blue-50 p-6">
                    <CreditCard className="text-[#034694]" />

                    <div>
                      <h3 className="font-bold">M-Pesa</h3>

                      <p className="mt-1 text-sm text-gray-600">
                        An M-Pesa STK Push will be sent to your
                        phone. Your order is only confirmed after
                        successful payment.
                      </p>
                    </div>
                  </div>

                  {!paymentWaiting && (
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#034694] py-5 text-lg font-bold text-white transition hover:bg-[#012A57] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading && (
                        <Loader2
                          size={20}
                          className="animate-spin"
                        />
                      )}

                      {loading
                        ? "Processing..."
                        : "Complete Order"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="text-3xl font-black">
                Order Summary
              </h2>

              <div className="mt-8 space-y-6">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex justify-between"
                  >
                    <div>
                      <h4 className="font-semibold">
                        {item.name}
                      </h4>

                      <p className="text-sm text-gray-500">
                        Size {item.size || "M"} · Qty:{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <span>
                      KES{" "}
                      {(
                        item.price * item.quantity
                      ).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="my-8" />

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  KES {totalPrice.toLocaleString()}
                </span>
              </div>

              <div className="mt-4 flex justify-between">
                <span>Delivery</span>

                <span>
                  {deliveryFee === 0
                    ? "FREE"
                    : `KES ${deliveryFee}`}
                </span>
              </div>

              <div className="mt-10 flex justify-between text-3xl font-black">
                <span>Total</span>

                <span>
                  KES {grandTotal.toLocaleString()}
                </span>
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
