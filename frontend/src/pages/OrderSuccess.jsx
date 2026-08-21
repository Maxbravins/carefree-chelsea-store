import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export default function OrderSuccess() {
    return (
        <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

            <div className="bg-white rounded-3xl shadow-xl max-w-xl w-full p-12 text-center">

                <CheckCircle2
                    size={90}
                    className="mx-auto text-green-500"
                />

                <h1 className="text-5xl font-black mt-8">

                    Order Successful!

                </h1>

                <p className="text-gray-600 mt-6 leading-8">

                    Thank you for shopping with Carefree Chelsea Store.

                    Your order has been received successfully.

                    You will receive an M-Pesa payment prompt shortly.

                </p>

                <div className="mt-12 flex justify-center gap-5">

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