import { useState } from "react";
import { CreditCard, ShieldCheck, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import api from "../api/api";
import toast from "react-hot-toast";

export default function Checkout() {

    const navigate = useNavigate();

    const { cart, totalPrice, clearCart } = useCart();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        customer_name: "",
        phone: "",
        county: "",
        town: "",
        address: "",
    });

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        try {

            await api.post("/orders", {

                ...form,

                items: cart,

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

            <div className="max-w-7xl mx-auto px-6">

                <h1 className="text-5xl font-black mb-14">

                    Checkout

                </h1>

                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Customer Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-10"
                    >

                        <h2 className="text-3xl font-black mb-10">

                            Delivery Information

                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            <input
                                name="customer_name"
                                placeholder="Full Name"
                                required
                                value={form.customer_name}
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
                            rows="5"
                            placeholder="Delivery Address"
                            required
                            value={form.address}
                            onChange={handleChange}
                            className="w-full mt-6 border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#034694]"
                        />

                        <div className="mt-10 bg-blue-50 rounded-2xl p-6">

                            <div className="flex items-center gap-4">

                                <CreditCard className="text-[#034694]" />

                                <div>

                                    <h3 className="font-bold">

                                        Secure M-Pesa Payment

                                    </h3>

                                    <p className="text-gray-600 mt-1">

                                        After placing your order you'll receive an M-Pesa STK Push on your phone.

                                    </p>

                                </div>

                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-10 w-full bg-[#034694] hover:bg-[#012A57] text-white py-5 rounded-xl text-lg font-bold transition"
                        >

                            {loading
                                ? "Processing..."
                                : "Place Order"}

                        </button>

                    </form>

                    {/* Summary */}

                    <div>

                        <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24">

                            <h2 className="text-3xl font-black">

                                Order Summary

                            </h2>

                            <div className="space-y-6 mt-8">

                                {cart.map((item) => (

                                    <div
                                        key={item.id}
                                        className="flex justify-between"
                                    >

                                        <div>

                                            <h4 className="font-semibold">

                                                {item.name}

                                            </h4>

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

                                <span>

                                    KES {totalPrice.toLocaleString()}

                                </span>

                            </div>

                            <div className="flex justify-between mt-4">

                                <span>Delivery</span>

                                <span>FREE</span>

                            </div>

                            <div className="flex justify-between text-3xl font-black mt-10">

                                <span>Total</span>

                                <span>

                                    KES {totalPrice.toLocaleString()}

                                </span>

                            </div>

                            <div className="mt-10 space-y-5">

                                <div className="flex gap-3">

                                    <Truck className="text-green-600" />

                                    <span>

                                        Nationwide Delivery

                                    </span>

                                </div>

                                <div className="flex gap-3">

                                    <ShieldCheck className="text-green-600" />

                                    <span>

                                        Secure Checkout

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}