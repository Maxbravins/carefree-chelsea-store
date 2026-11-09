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

            <section className="flex min-h-[65vh] items-center justify-center bg-[#f8f7f3] px-4 py-16">

                <div className="text-center">

                    <ShoppingBag
                        size={48}
                        className="mx-auto text-[#034694]"
                    />

                    <h2 className="mt-6 font-serif text-3xl font-bold text-[#111820] sm:text-4xl">

                        Your Cart Is Empty

                    </h2>

                    <p className="mt-3 text-slate-600">

                        Browse club and national team jerseys.

                    </p>

                    <Link
                        to="/shop"
                        className="mt-8 inline-flex items-center gap-3 bg-[#071a35] px-6 py-3.5 font-bold text-white transition hover:bg-[#034694]"
                    >

                        Continue Shopping

                        <ArrowRight size={20} />

                    </Link>

                </div>

            </section>

        );

    }

    return (

        <section className="bg-[#f8f7f3] py-8 sm:py-12 lg:py-16">

            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
                    <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#034694]">Your selection</p>
                        <h1 className="mt-2 font-serif text-3xl font-bold text-[#111820] sm:text-4xl lg:text-5xl">Shopping bag</h1>
                    </div>
                    <span className="text-sm font-semibold text-slate-500">{cart.length} {cart.length === 1 ? "item" : "items"}</span>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">

                    {/* Cart */}

                    <div className="lg:col-span-2">

                        {cart.map((item) => (

                            <div
                                key={`${item.id}-${item.size}`}
                                className="flex flex-col gap-5 border-y border-slate-300 py-5 sm:flex-row sm:gap-7"
                            >

                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="h-56 w-full bg-[#eeece5] object-contain sm:h-48 sm:w-44"
                                />

                                <div className="flex-1">

                                    <h2 className="font-bold text-slate-900 sm:text-lg">

                                        {item.name}

                                    </h2>

                                    <p className="text-gray-500 mt-2 text-sm sm:text-base">

                                        {item.category}
                                        {item.size && (
                                            <span className="ml-2 inline-block border border-slate-300 bg-white px-2 py-0.5 text-xs font-semibold text-slate-700 sm:text-sm">
                                                Size {item.size}
                                            </span>
                                        )}
                                    </p>

                                    <p className="mt-4 text-xl font-extrabold text-[#034694] sm:mt-6 sm:text-2xl">

                                        KSh {Number(item.price).toLocaleString()}

                                    </p>

                                    <div className="flex items-center gap-4 mt-6 sm:mt-8">

                                        <button
                                            onClick={() => decreaseQuantity(item.id, item.size)}
                                            className="flex h-9 w-9 items-center justify-center border border-slate-300 bg-white transition hover:bg-slate-100"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={18} />
                                        </button>

                                        <span className="font-bold text-lg">

                                            {item.quantity}

                                        </span>

                                        <button
                                            onClick={() => increaseQuantity(item.id, item.size)}
                                            className="flex h-9 w-9 items-center justify-center border border-slate-300 bg-white transition hover:bg-slate-100"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={18} />
                                        </button>

                                    </div>

                                </div>

                                <div className="flex flex-row items-center justify-between border-t border-slate-200 pt-3 sm:flex-col sm:items-end sm:justify-between sm:border-0 sm:pt-0">

                                    <button
                                        onClick={() => removeFromCart(item.id, item.size)}
                                        className="p-2 text-slate-500 transition hover:text-red-700"
                                        aria-label="Remove item"
                                    >

                                        <Trash2 size={22} />

                                    </button>

                                    <h3 className="text-lg font-extrabold text-slate-900 sm:mt-auto sm:text-xl">

                                        KSh {(item.price * item.quantity).toLocaleString()}

                                    </h3>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* Summary */}

                    <div>

                        <div className="sticky top-24 border border-slate-200 bg-white p-5 sm:p-7">

                            <h2 className="font-serif text-2xl font-bold text-[#111820]">

                                Order Summary

                            </h2>

                            <div className="flex justify-between mt-10">

                                <span>Subtotal</span>

                                <span>

                                    KSh {total.toLocaleString()}

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

                                    KSh {total.toLocaleString()}

                                </span>

                            </div>

                            <Link
                                to="/checkout"
                                className="mt-8 flex w-full items-center justify-center gap-3 bg-[#071a35] py-4 font-bold text-white transition hover:bg-[#034694]"
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
