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

            <section className="min-h-screen flex items-center justify-center bg-gray-50">

                <div className="text-center">

                    <Heart
                        size={90}
                        className="mx-auto text-[#034694]"
                    />

                    <h2 className="text-4xl font-black mt-8">

                        Your Wishlist Is Empty

                    </h2>

                    <p className="text-gray-500 mt-4">

                        Save your favorite Chelsea gear for later.

                    </p>

                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-3 mt-10 bg-[#034694] hover:bg-[#012A57] text-white px-8 py-4 rounded-xl font-bold transition"
                    >

                        Browse Shop

                        <ArrowRight size={20} />

                    </Link>

                </div>

            </section>

        );

    }

    return (

        <section className="bg-gray-50 py-20">

            <div className="max-w-7xl mx-auto px-6">

                <h1 className="text-5xl font-black mb-14">

                    My Wishlist

                </h1>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {wishlist.map((item) => (

                        <div
                            key={item.id}
                            className="bg-white rounded-3xl shadow-lg overflow-hidden"
                        >

                            <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-full h-64 object-cover"
                            />

                            <div className="p-6">

                                <h3 className="text-xl font-black">

                                    {item.name}

                                </h3>

                                <p className="text-[#034694] text-2xl font-black mt-3">

                                    KES {Number(item.price).toLocaleString()}

                                </p>

                                <div className="flex gap-3 mt-6">

                                    <button
                                        onClick={() => {
                                            addToCart({ ...item, size: item.size || "M" });
                                            toast.success(`${item.name} added to cart`);
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#034694] hover:bg-[#012A57] text-white py-3 rounded-xl font-bold transition"
                                    >
                                        <ShoppingBag size={18} />
                                        Add To Cart
                                    </button>

                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="p-3 rounded-xl bg-gray-100 text-red-600 hover:bg-red-50 transition"
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