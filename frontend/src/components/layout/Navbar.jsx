import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
    Menu,
    X,
    ShoppingBag,
    Search,
    Heart,
} from "lucide-react";

import { useCart } from "../../CartContext";
import { useWishlist } from "../../WishlistContext";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const { totalItems: cartCount } = useCart();
    const { wishlistCount } = useWishlist();

    const navLink = ({ isActive }) =>
        isActive
            ? "text-[#034694] font-bold"
            : "text-gray-700 hover:text-[#034694] transition";

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">

            <div className="max-w-7xl mx-auto px-6">

                <div className="h-20 flex items-center justify-between">

                    {/* Logo */}

                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >
                        <img
                            src="/images/logo1.png"
                            alt="Chelsea"
                            className="w-12 h-12 rounded-full"
                        />

                        <div>

                            <h1 className="font-black text-xl text-[#034694]">
                                Carefree Chelsea
                            </h1>

                            <p className="text-xs text-gray-500">
                                Official Fan Store
                            </p>

                        </div>

                    </Link>

                    {/* Desktop */}

                    <nav className="hidden lg:flex items-center gap-10">

                        <NavLink
                            to="/"
                            className={navLink}
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/shop"
                            className={navLink}
                        >
                            Shop
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={navLink}
                        >
                            About
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className={navLink}
                        >
                            Contact
                        </NavLink>

                    </nav>

                    {/* Right */}

                    <div className="hidden lg:flex items-center gap-6">

                        <Link
                            to="/shop"
                            className="hover:text-[#034694]"
                        >
                            <Search />
                        </Link>

                        <Link
                            to="/wishlist"
                            className="relative hover:text-[#034694]"
                        >
                            <Heart />

                            {wishlistCount > 0 && (

                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex justify-center items-center font-bold">

                                    {wishlistCount}

                                </span>

                            )}

                        </Link>

                        <Link
                            to="/cart"
                            className="relative"
                        >

                            <ShoppingBag
                                size={26}
                                className="text-[#034694]"
                            />

                            {cartCount > 0 && (

                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex justify-center items-center font-bold">

                                    {cartCount}

                                </span>

                            )}

                        </Link>

                    </div>

                    {/* Mobile top bar icons */}
                    <div className="flex items-center gap-4 lg:hidden">
                        <Link
                            to="/wishlist"
                            className="relative p-2"
                        >
                            <Heart
                                size={24}
                                className="text-[#034694]"
                            />
                            {wishlistCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex justify-center items-center font-bold">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        <Link
                            to="/cart"
                            className="relative p-2"
                        >
                            <ShoppingBag
                                size={24}
                                className="text-[#034694]"
                            />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex justify-center items-center font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 text-gray-700 hover:text-[#034694]"
                            aria-label="Toggle Navigation Menu"
                        >
                            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>

                </div>

            </div>

            {/* Mobile Menu */}

            {mobileOpen && (

                <div className="lg:hidden border-t bg-white shadow-xl">

                    <div className="px-6 py-6 flex flex-col space-y-4">

                        <NavLink
                            to="/"
                            className={navLink}
                            onClick={() => setMobileOpen(false)}
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/shop"
                            className={navLink}
                            onClick={() => setMobileOpen(false)}
                        >
                            Shop Collection
                        </NavLink>

                        <NavLink
                            to="/wishlist"
                            className={navLink}
                            onClick={() => setMobileOpen(false)}
                        >
                            Wishlist ({wishlistCount})
                        </NavLink>

                        <NavLink
                            to="/cart"
                            className={navLink}
                            onClick={() => setMobileOpen(false)}
                        >
                            Shopping Cart ({cartCount})
                        </NavLink>

                        <NavLink
                            to="/checkout"
                            className={navLink}
                            onClick={() => setMobileOpen(false)}
                        >
                            Checkout
                        </NavLink>

                    </div>

                </div>

            )}

        </header>
    );
}