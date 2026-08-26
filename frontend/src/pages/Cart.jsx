import { Link } from "react-router-dom";
import {
    ShoppingBag,
    Trash2,
    Plus,
    Minus,
    ArrowRight,
} from "lucide-react";

import { useCart } from "../CartContext";

export default function Cart() {

    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cart.length === 0) {

        return (

            <section className="min-h-screen flex items-center justify-center bg-gray-50">

                <div className="text-center">

                    <ShoppingBag
                        size={90}
                        className="mx-auto text-[#034694]"
                    />

                    <h2 className="text-4xl font-black mt-8">

                        Your Cart Is Empty

                    </h2>

                    <p className="text-gray-500 mt-4">

                        Browse our latest Chelsea collection.

                    </p>

                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-3 mt-10 bg-[#034694] hover:bg-[#012A57] text-white px-8 py-4 rounded-xl font-bold transition"
                    >

                        Continue Shopping

                        <ArrowRight size={20} />

                    </Link>

                </div>

            </section>

        );

    }

    return (

        <section className="bg-gray-50 py-10 sm:py-16 lg:py-20">

            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8 sm:mb-14">

                    Shopping Cart

                </h1>

                <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">

                    {/* Cart */}

                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">

                        {cart.map((item) => (

                            <div
                                key={`${item.id}-${item.size}`}
                                className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 flex flex-col sm:flex-row gap-6"
                            >

                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-full sm:w-48 h-56 sm:h-48 object-cover rounded-2xl"
                                />

                                <div className="flex-1">

                                    <h2 className="text-xl sm:text-2xl font-black">

                                        {item.name}

                                    </h2>

                                    <p className="text-gray-500 mt-2 text-sm sm:text-base">

                                        {item.category}
                                        {item.size && (
                                            <span className="ml-2 inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md text-xs sm:text-sm font-semibold">
                                                Size {item.size}
                                            </span>
                                        )}
                                    </p>

                                    <p className="text-[#034694] text-2xl sm:text-3xl font-black mt-4 sm:mt-6">

                                        KES {Number(item.price).toLocaleString()}

                                    </p>

                                    <div className="flex items-center gap-4 mt-6 sm:mt-8">

                                        <button
                                            onClick={() => decreaseQuantity(item.id, item.size)}
                                            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={18} />
                                        </button>

                                        <span className="font-bold text-lg">

                                            {item.quantity}

                                        </span>

                                        <button
                                            onClick={() => increaseQuantity(item.id, item.size)}
                                            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={18} />
                                        </button>

                                    </div>

                                </div>

                                <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end pt-4 sm:pt-0 border-t sm:border-0 border-gray-100">

                                    <button
                                        onClick={() => removeFromCart(item.id, item.size)}
                                        className="text-red-600 hover:text-red-700 p-2"
                                        aria-label="Remove item"
                                    >

                                        <Trash2 size={22} />

                                    </button>

                                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">

                                        KES {(item.price * item.quantity).toLocaleString()}

                                    </h3>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* Summary */}

                    <div>

                        <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24">

                            <h2 className="text-3xl font-black">

                                Order Summary

                            </h2>

                            <div className="flex justify-between mt-10">

                                <span>Subtotal</span>

                                <span>

                                    KES {total.toLocaleString()}

                                </span>

                            </div>

                            <div className="flex justify-between mt-6">

                                <span>Delivery</span>

                                <span>

                                    FREE

                                </span>

                            </div>

                            <hr className="my-8" />

                            <div className="flex justify-between text-2xl font-black">

                                <span>Total</span>

                                <span>

                                    KES {total.toLocaleString()}

                                </span>

                            </div>

                            <Link
                                to="/checkout"
                                className="mt-10 flex justify-center items-center gap-3 w-full bg-[#034694] hover:bg-[#012A57] text-white py-5 rounded-xl font-bold transition"
                            >

                                Proceed To Checkout

                                <ArrowRight size={20} />

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}
