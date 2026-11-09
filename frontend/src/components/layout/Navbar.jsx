import { useState } from "react";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
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
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const shopType = searchParams.get("type");

    const navLink = ({ isActive }) =>
        `border-b-2 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] transition ${isActive
            ? "border-[#034694] text-[#034694]"
            : "border-transparent text-slate-600 hover:border-slate-400 hover:text-slate-950"}`;

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#fbfaf7]">

            <div className="bg-[#071a35] text-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] sm:px-6">
                    <span>Delivery across Kenya</span>
                    <span className="text-blue-100">Secure M-Pesa checkout</span>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6">

                <div className="flex h-16 items-center justify-between sm:h-[72px]">

                    {/* Logo */}

                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >
                        <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#071a35] font-serif text-lg font-bold text-white">K</span>

                        <div>

                            <h1 className="text-sm font-black uppercase tracking-wide text-[#071a35] sm:text-base">
                                Kit Sphere
                            </h1>

                            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                Club & Country Jerseys
                            </p>

                        </div>

                    </Link>

                    {/* Desktop */}

                    <nav className="hidden items-center gap-4 lg:flex xl:gap-6">

                        <NavLink
                            to="/"
                            className={navLink}
                        >
                            Home
                        </NavLink>

                        <NavLink to="/shop" end className={({ isActive }) => navLink({ isActive: isActive && !shopType })}>
                            Shop
                        </NavLink>

                        <Link to="/shop?type=club" className={`border-b-2 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] transition ${location.pathname === "/shop" && shopType === "club" ? "border-[#034694] text-[#034694]" : "border-transparent text-slate-600 hover:border-slate-400 hover:text-slate-950"}`}>
                            Clubs
                        </Link>

                        <Link to="/shop?type=national" className={`border-b-2 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] transition ${location.pathname === "/shop" && shopType === "national" ? "border-[#034694] text-[#034694]" : "border-transparent text-slate-600 hover:border-slate-400 hover:text-slate-950"}`}>
                            Countries
                        </Link>

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

                        <NavLink
                            to="/help"
                            className={navLink}
                        >
                            Help
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

                    <div className="flex flex-col space-y-4 px-6 py-6">

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

                        <Link to="/shop?type=club" className="text-slate-700 hover:text-[#034694]" onClick={() => setMobileOpen(false)}>
                            Club teams
                        </Link>

                        <Link to="/shop?type=national" className="text-slate-700 hover:text-[#034694]" onClick={() => setMobileOpen(false)}>
                            National teams
                        </Link>

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

                        <NavLink
                            to="/help"
                            className={navLink}
                            onClick={() => setMobileOpen(false)}
                        >
                            Help & FAQs
                        </NavLink>

                    </div>

                </div>

            )}

        </header>
    );
}
