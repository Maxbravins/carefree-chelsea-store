import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, ShieldCheck, Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "../CartContext";

export default function Navbar() {
  const { items } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-bold tracking-wide transition-all py-2 border-b-2 ${
      isActive
        ? "text-blue-900 border-blue-700"
        : "text-slate-600 border-transparent hover:text-blue-800 hover:border-blue-300"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 text-center font-semibold tracking-wider flex justify-center items-center gap-2">
        <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">Official</span>
        <span>Carefree Chelsea Store • Express Delivery Across Kenya • 100% Authentic Nike Apparel</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-blue-900 border-2 border-amber-400 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition">
              CFC
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-blue-950 group-hover:text-blue-700 transition">
                Carefree Chelsea
              </h1>
              <p className="text-[11px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck size={12} /> Store & Kit Room
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/shop" className={navLinkClass}>Jersey Shop</NavLink>
            <NavLink to="/cart" className={navLinkClass}>Shopping Cart</NavLink>
            <NavLink to="/checkout" className={navLinkClass}>Checkout</NavLink>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="http://127.0.0.1:8000/admin"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
            >
              <span>Admin Portal</span>
              <ArrowUpRight size={14} />
            </a>

            <Link
              to="/cart"
              className="relative p-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2 px-4"
            >
              <ShoppingBag size={20} />
              <span className="text-sm font-bold">Cart</span>
              {totalItems > 0 && (
                <span className="bg-amber-400 text-slate-950 font-extrabold text-xs px-2 py-0.5 rounded-full animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 flex flex-col gap-3">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className={navLinkClass}>Home</NavLink>
            <NavLink to="/shop" onClick={() => setMenuOpen(false)} className={navLinkClass}>Jersey Shop</NavLink>
            <NavLink to="/cart" onClick={() => setMenuOpen(false)} className={navLinkClass}>Shopping Cart</NavLink>
            <NavLink to="/checkout" onClick={() => setMenuOpen(false)} className={navLinkClass}>Checkout</NavLink>
            <a
              href="http://127.0.0.1:8000/admin"
              target="_blank"
              rel="noreferrer"
              className="mt-2 text-center py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              Open Admin Dashboard ↗
            </a>
          </div>
        )}
      </div>
    </header>
  );
}