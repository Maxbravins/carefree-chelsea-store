import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export default function OrderSuccess() {
    const location = useLocation();

    const orderId = location.state?.orderId;
    const receipt = location.state?.receipt;

    return (
        <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
            <div className="bg-white rounded-3xl shadow-xl max-w-xl w-full p-8 sm:p-12 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2
                        size={60}
                        className="text-green-500"
                    />
                </div>

                <h1 className="text-4xl sm:text-5xl font-black mt-8">
                    Order Placed Successfully!
                </h1>

                <p className="text-gray-600 mt-6 leading-8">
                    Thank you for shopping with Carefree Chelsea
                    Store. Your M-Pesa payment has been confirmed
                    and your order has been received successfully.
                </p>

                {orderId && (
                    <div className="mt-8 rounded-2xl bg-blue-50 p-5">
                        <p className="text-sm text-gray-500">
                            Order Number
                        </p>

                        <p className="mt-1 text-2xl font-black text-[#034694]">
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
                    <Link
                        to="/shop"
                        className="bg-[#034694] hover:bg-[#012A57] text-white px-8 py-4 rounded-xl font-bold transition"
                    >
                        Continue Shopping
                    </Link>

                    <Link
                        to="/"
                        className="border-2 border-[#034694] text-[#034694] hover:bg-[#034694] hover:text-white px-8 py-4 rounded-xl font-bold transition"
                    >
                        Home
                    </Link>
                </div>

                <ShoppingBag
                    className="mx-auto mt-12 text-[#034694]"
                    size={40}
                />
            </div>
        </section>
    );
}
