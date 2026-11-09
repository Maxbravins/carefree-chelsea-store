import { Link } from "react-router-dom";
import { Heart, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

import { useWishlist } from "../WishlistContext";
import { useCart } from "../CartContext";

export default function Wishlist() {

    const { wishlist, removeFromWishlist } = useWishlist();

    const { addToCart } = useCart();

    if (wishlist.length === 0) {

        return (

            <section className="flex min-h-[65vh] items-center justify-center bg-[#f8f7f3] px-4 py-16">

                <div className="text-center">

                    <Heart
                        size={48}
                        className="mx-auto text-[#034694]"
                    />

                    <h2 className="mt-6 font-serif text-3xl font-bold text-[#111820] sm:text-4xl">

                        Your Wishlist Is Empty

                    </h2>

                    <p className="mt-3 text-slate-600">

                        Save your favourite team jerseys for later.

                    </p>

                    <Link
                        to="/shop"
                        className="mt-8 inline-flex items-center gap-3 bg-[#071a35] px-6 py-3.5 font-bold text-white transition hover:bg-[#034694]"
                    >

                        Browse Shop

                        <ArrowRight size={20} />

                    </Link>

                </div>

            </section>

        );

    }

    return (

        <section className="bg-[#f8f7f3] py-8 sm:py-12 lg:py-16">

            <div className="max-w-7xl mx-auto px-6">

                <div className="mb-8">
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#034694]">Saved for later</p>
                    <h1 className="mt-2 font-serif text-3xl font-bold text-[#111820] sm:text-4xl">My wishlist</h1>
                </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">

                    {wishlist.map((item) => (

                        <div
                            key={item.id}
                            className="overflow-hidden border-b border-slate-200 bg-white"
                        >

                            <img
                                src={item.image_url}
                                alt={item.name}
                                className="aspect-[4/5] w-full bg-[#eeece5] object-contain mix-blend-multiply"
                            />

                            <div className="px-1 py-4 sm:px-2">

                                <h3 className="text-sm font-bold sm:text-base">

                                    {item.name}

                                </h3>

                                <p className="mt-3 text-lg font-extrabold text-[#034694]">

                                    KSh {Number(item.price).toLocaleString()}

                                </p>

                                <div className="flex gap-3 mt-6">

                                    <button
                                        onClick={() => {
                                            addToCart({ ...item, size: item.size || "M" });
                                            toast.success(`${item.name} added to cart`);
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#071a35] py-3 text-xs font-bold text-white transition hover:bg-[#034694] sm:text-sm"
                                    >
                                        <ShoppingBag size={18} />
                                        Add To Cart
                                    </button>

                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="border border-slate-300 p-3 text-slate-500 transition hover:border-red-300 hover:text-red-700"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}
