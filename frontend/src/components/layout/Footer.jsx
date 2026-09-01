import {
    Mail,
    Phone,
    MapPin,
    ArrowRight,
} from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-[#021B3A] text-white mt-24">

            {/* Newsletter */}

            <div className="border-b border-white/10">

                <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">

                    <div>

                        <p className="uppercase tracking-widest text-blue-300">
                            Stay Updated
                        </p>

                        <h2 className="text-4xl font-black mt-3">
                            Join the Chelsea Family
                        </h2>

                        <p className="text-blue-100 mt-4 max-w-lg">
                            Receive exclusive offers, new arrivals,
                            and matchday merchandise directly in your inbox.
                        </p>

                    </div>

                <div className="flex flex-col sm:flex-row gap-4">

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 rounded-xl px-5 py-4 text-black outline-none"
                    />

                    <Link
                        to="/newsletter"
                        className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition"
                    >
                        Subscribe
                        <ArrowRight size={18} />
                    </Link>

                </div>

                </div>

            </div>

            {/* Main Footer */}

            <div className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14">

                    {/* Brand */}

                    <div>

                        <img
                            src="/images/logo1.png"
                            alt="Chelsea"
                            className="w-20 mb-5"
                        />

                        <h2 className="text-2xl font-black">
                            Carefree Chelsea
                        </h2>

                        <p className="text-blue-100 mt-5 leading-8">
                            Kenya's trusted Chelsea merchandise store.
                            Authentic jerseys, accessories,
                            collectibles and official fan wear.
                        </p>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="text-xl font-bold mb-6">
                            Quick Links
                        </h3>

                        <div className="space-y-4">

                            <Link to="/" className="block hover:text-yellow-400">
                                Home
                            </Link>

                            <Link to="/shop" className="block hover:text-yellow-400">
                                Shop
                            </Link>

                            <Link to="/cart" className="block hover:text-yellow-400">
                                Cart
                            </Link>

                            <Link to="/checkout" className="block hover:text-yellow-400">
                                Checkout
                            </Link>

                        </div>

                    </div>

                    {/* Categories */}

                    <div>

                        <h3 className="text-xl font-bold mb-6">
                            Categories
                        </h3>

                        <div className="space-y-4">

                            <p>Home Kits</p>

                            <p>Away Kits</p>

                            <p>Third Kits</p>

                            <p>Retro Jerseys</p>

                            <p>Training Wear</p>

                        </div>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="text-xl font-bold mb-6">
                            Contact
                        </h3>

                        <div className="space-y-5">

                            <div className="flex gap-3">

                                <MapPin className="text-yellow-400"/>

                                <span>
                                    Nairobi, Kenya
                                </span>

                            </div>

                            <div className="flex gap-3">

                                <Phone className="text-yellow-400"/>

                                <span>
                                    +254 759 490 467
                                </span>

                            </div>

                            <div className="flex gap-3">

                                <Mail className="text-yellow-400"/>

                                <span>
                                    support@carefreechelsea.com
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Social */}

                <div className="border-t border-white/10 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">

                    <p className="text-blue-200">
                        © {new Date().getFullYear()} Carefree Chelsea Store.
                        All Rights Reserved.
                    </p>

                    <div className="flex gap-5">

                        <a
                            href="#"
                            className="hover:text-yellow-400"
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href="#"
                            className="hover:text-yellow-400"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="#"
                            className="hover:text-yellow-400"
                        >
                            <FaTwitter />
                        </a>

                        <a
                            href="#"
                            className="hover:text-yellow-400"
                        >
                            <FaYoutube />
                        </a>

                    </div>

                </div>

            </div>

        </footer>
    );
}