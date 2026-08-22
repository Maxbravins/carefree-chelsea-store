import { useState } from "react";
import { Bell, CheckCircle2, Mail } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/api";

export default function StockNotification({ product }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email address.");
            return;
        }

        setLoading(true);

        try {
            await api.post("/stock-notifications", {
                product_id: product.id,
                email: email.trim(),
            });

            setSubscribed(true);

            toast.success(
                "You're on the list! We'll email you when it's back in stock."
            );

            setEmail("");
        } catch (error) {
            console.error(error);

            const message =
                error.response?.data?.message ||
                "Unable to subscribe. Please try again.";

            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    if (subscribed) {
        return (
            <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">

                <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle2
                            size={25}
                            className="text-green-600"
                        />
                    </div>

                    <div>
                        <h3 className="font-bold text-green-800">
                            You're on the list
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-green-700">
                            We'll send you an email as soon as{" "}
                            <span className="font-semibold">
                                {product.name}
                            </span>{" "}
                            is back in stock.
                        </p>
                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">

            <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#034694]/10">
                    <Bell
                        size={24}
                        className="text-[#034694]"
                    />
                </div>

                <div>
                    <h3 className="text-xl font-bold text-slate-900">
                        Notify Me When Available
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                        This product is currently out of stock.
                        Enter your email and we'll notify you when
                        it's available again.
                    </p>
                </div>

            </div>

            <form
                onSubmit={handleSubmit}
                className="mt-6"
            >

                <div className="relative">

                    <Mail
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-4 text-sm outline-none transition focus:border-[#034694] focus:ring-2 focus:ring-[#034694]/20"
                        required
                    />

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#034694] py-4 font-bold text-white transition hover:bg-[#012A57] disabled:cursor-not-allowed disabled:opacity-60"
                >

                    <Bell size={18} />

                    {loading
                        ? "Saving..."
                        : "Notify Me When Available"}

                </button>

            </form>

            <p className="mt-4 text-center text-xs text-gray-400">
                We'll only use your email for this stock notification.
            </p>

        </div>
    );
}