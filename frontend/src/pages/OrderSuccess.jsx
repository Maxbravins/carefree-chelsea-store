import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export default function OrderSuccess() {
    const location = useLocation();

    const orderId = location.state?.orderId;
    const receipt = location.state?.receipt;

    return (
        <section className="flex min-h-[70vh] items-center justify-center bg-[#f8f7f3] px-4 py-16 sm:px-6">
            <div className="w-full max-w-2xl border border-slate-200 bg-white p-6 sm:p-10">
                <div className="flex h-12 w-12 items-center justify-center border border-emerald-300 bg-emerald-50">
                    <CheckCircle2
                        size={26}
                        className="text-emerald-700"
                    />
                </div>

                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">Order confirmed</p>
                <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#111820] sm:text-4xl">
                    Thanks for your order.
                </h1>

                <p className="mt-4 max-w-xl leading-7 text-slate-600">
                    Your M-Pesa payment is confirmed and the order has been received. Keep the order number and receipt details for reference.
                </p>

                {orderId && (
                    <div className="mt-7 border-y border-slate-300 py-5">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Order number
                        </p>

                        <p className="mt-1 text-2xl font-extrabold text-[#034694]">
                            #{orderId}
                        </p>

                        {receipt && (
                            <p className="mt-3 text-sm text-gray-600">
                                M-Pesa Receipt:{" "}
                                <span className="font-bold">
                                    {receipt}
                                </span>
                            </p>
                        )}
                    </div>
                )}

                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/shop" className="bg-[#071a35] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#034694]">
                        Continue Shopping
                    </Link>

                    <Link to="/" className="border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-[#034694] hover:text-[#034694]">Home</Link>
                </div>

                <ShoppingBag className="mt-8 text-slate-300" size={24} />
            </div>
        </section>
    );
}
