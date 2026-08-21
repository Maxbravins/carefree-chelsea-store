import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-[#021B3A] via-[#034694] to-[#0055B8]">

            {/* Background */}

            <div className="absolute inset-0">

                <img
                    src="/images/hero.jpg"
                    alt="Chelsea"
                    className="w-full h-full object-cover opacity-20"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#021B3A]/95 via-[#034694]/80 to-transparent"></div>

            </div>

            <div className="relative max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 items-center min-h-[90vh] gap-16">

                    {/* LEFT */}

                    <div>

                        <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-yellow-300 px-5 py-2 rounded-full text-sm font-semibold">

                            ⚽ Official Chelsea Fan Store

                        </span>

                        <h1 className="mt-8 text-6xl lg:text-7xl font-black text-white leading-tight">

                            Wear The
                            <span className="block text-yellow-400">
                                Pride Of London
                            </span>

                        </h1>

                        <p className="mt-8 text-xl text-blue-100 leading-9 max-w-xl">

                            Discover authentic Chelsea FC jerseys,
                            training wear, retro collections and exclusive
                            fan merchandise delivered across Kenya.

                        </p>

                        <div className="flex flex-wrap gap-5 mt-12">

                            <Link
                                to="/shop"
                                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-xl flex items-center gap-3 transition duration-300 shadow-xl"
                            >

                                <ShoppingBag size={22} />

                                Shop Now

                            </Link>

                            <Link
                                to="/shop"
                                className="border-2 border-white text-white hover:bg-white hover:text-[#034694] px-8 py-4 rounded-xl flex items-center gap-3 font-bold transition duration-300"
                            >

                                Explore Collection

                                <ArrowRight size={20} />

                            </Link>

                        </div>

                        {/* Stats */}

                        <div className="grid grid-cols-3 gap-8 mt-20">

                            <div>

                                <h2 className="text-4xl font-black text-yellow-400">
                                    5K+
                                </h2>

                                <p className="text-blue-200 mt-2">
                                    Happy Fans
                                </p>

                            </div>

                            <div>

                                <h2 className="text-4xl font-black text-yellow-400">
                                    100+
                                </h2>

                                <p className="text-blue-200 mt-2">
                                    Official Products
                                </p>

                            </div>

                            <div>

                                <h2 className="text-4xl font-black text-yellow-400">
                                    24/7
                                </h2>

                                <p className="text-blue-200 mt-2">
                                    Customer Support
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="hidden lg:flex justify-center relative">

                        <div className="relative">

                            <div className="absolute -inset-10 bg-yellow-400 rounded-full blur-3xl opacity-20"></div>

                            <img
                                src="/images/chelsea-home.png"
                                alt="Chelsea Home Kit"
                                className="relative w-[550px] drop-shadow-2xl hover:scale-105 transition duration-500"
                            />

                            {/* Floating Card */}

                            <div className="absolute top-16 -left-10 bg-white rounded-2xl shadow-2xl p-5">

                                <p className="text-gray-500 text-sm">
                                    Best Seller
                                </p>

                                <h3 className="font-black mt-1">
                                    Home Kit 2026/27
                                </h3>

                                <p className="text-[#034694] font-black text-2xl mt-2">
                                    KES 2,500
                                </p>

                            </div>

                            <div className="absolute bottom-10 -right-10 bg-white rounded-2xl shadow-2xl p-5">

                                <p className="text-green-600 font-bold">
                                    ✓ In Stock
                                </p>

                                <p className="text-gray-500 mt-2">
                                    Fast Delivery
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}