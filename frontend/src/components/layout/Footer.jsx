import {
    Mail,
    Phone,
    MapPin,
    ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="mt-16 bg-[#071a35] text-white sm:mt-20">

            {/* Newsletter */}

            <div className="border-b border-white/10">

                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">

                    <div>

                        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-blue-200">
                            New arrivals by email
                        </p>

                    </div>

                    <Link
                        to="/newsletter"
                        className="inline-flex items-center justify-center gap-2 border border-white/40 px-5 py-3 text-sm font-bold transition hover:bg-white hover:text-[#071a35]"
                    >
                        Sign up to the newsletter
                        <ArrowRight size={18} />
                    </Link>

                </div>

            </div>

            {/* Main Footer */}

            <div className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14">

                    {/* Brand */}

                    <div>

                        <span aria-hidden="true" className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white font-serif text-xl font-bold text-[#071a35]">K</span>

                        <h2 className="text-2xl font-black">
                            Kit Sphere
                        </h2>

                        <p className="text-blue-100 mt-5 leading-8">
                            Kenya's home for club and national team jerseys.
                            Find club colours and national pride in one place.
                        </p>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="text-xl font-bold mb-6">
                            Quick Links
                        </h3>

                        <div className="space-y-4">

                            <Link to="/" className="block text-blue-100 transition hover:text-white">
                                Home
                            </Link>

                            <Link to="/shop" className="block text-blue-100 transition hover:text-white">
                                Shop
                            </Link>

                            <Link to="/cart" className="block text-blue-100 transition hover:text-white">
                                Cart
                            </Link>

                            <Link to="/checkout" className="block text-blue-100 transition hover:text-white">
                                Checkout
                            </Link>

                            <Link to="/help" className="block text-blue-100 transition hover:text-white">
                                Help & FAQs
                            </Link>

                            <Link to="/about" className="block text-blue-100 transition hover:text-white">
                                About
                            </Link>

                            <Link to="/contact" className="block text-blue-100 transition hover:text-white">
                                Contact
                            </Link>

                        </div>

                    </div>

                    {/* Categories */}

                    <div>

                        <h3 className="text-xl font-bold mb-6">
                            Categories
                        </h3>

                        <div className="space-y-4">
                            <Link to="/shop?category=Home%20Kit" className="block text-blue-100 transition hover:text-white">Home kits</Link>
                            <Link to="/shop?category=Away%20Kit" className="block text-blue-100 transition hover:text-white">Away kits</Link>
                            <Link to="/shop?category=Third%20Kit" className="block text-blue-100 transition hover:text-white">Third kits</Link>
                            <Link to="/shop?category=Retro%20Kit" className="block text-blue-100 transition hover:text-white">Retro jerseys</Link>
                            <Link to="/shop?category=Training" className="block text-blue-100 transition hover:text-white">Training wear</Link>

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

                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm md:flex-row">

                    <p className="text-blue-200">
                        © {new Date().getFullYear()} Kit Sphere.
                        All Rights Reserved.
                    </p>

                    <Link to="/contact" className="font-semibold text-blue-100 transition hover:text-white">Questions? Contact us</Link>

                </div>

            </div>

        </footer>
    );
}
