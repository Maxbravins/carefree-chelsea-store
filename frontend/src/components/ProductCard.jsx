import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingCart, Zap, Heart } from "lucide-react";
import { useCart } from "../CartContext";
import { useWishlist } from "../WishlistContext";
import toast from "react-hot-toast";
import StockNotification from "./products/StockNotification";

const SIZES = ["S", "M", "L", "XL", "XXL"];

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [selectedSize, setSelectedSize] = useState(null);

    const imageUrl =
        product.image_url ||
        product.image ||
        "/images/chelsea-home.jpg";

    const stock = Number(product.stock || 0);
    const inWishlist = isInWishlist(product.id);

    function handleAddToCart() {
        if (stock <= 0) {
            toast.error("This product is currently out of stock.");
            return;
        }

        if (!selectedSize) {
            toast.error("Please select a size first.");
            return;
        }

        addToCart({
            ...product,
            size: selectedSize,
        });

        toast.success(
            `${product.name} (${selectedSize}) added to cart`
        );
    }

    function handleToggleWishlist() {
        toggleWishlist(product);
        toast.success(
            inWishlist
                ? `${product.name} removed from wishlist`
                : `${product.name} added to wishlist`
        );
    }

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative overflow-hidden bg-slate-100">
                <Link
                    to={`/product/${product.slug}`}
                    className="block aspect-square"
                >
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                {product.category && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#034694]/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow">
                        {product.category}
                    </span>
                )}

                <button
                    type="button"
                    onClick={handleToggleWishlist}
                    aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    aria-pressed={inWishlist}
                    className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full shadow transition ${
                        stock > 0 && stock <= 5 ? "mt-9" : ""
                    } ${
                        inWishlist
                            ? "bg-red-600 text-white"
                            : "bg-white/90 text-slate-700 hover:text-red-600"
                    }`}
                >
                    <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
                </button>

                {stock > 0 && stock <= 5 && (
                    <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-rose-600 px-2.5 py-1.5 text-[10px] font-extrabold text-white shadow">
                        <Zap size={11} />
                        Only {stock} left
                    </span>
                )}

                {stock <= 0 && (
                    <span className="absolute right-3 top-12 rounded-full bg-slate-900/90 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow">
                        Sold Out
                    </span>
                )}

                <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10 transition-transform duration-300 group-hover:translate-y-0">
                    <Link
                        to={`/product/${product.slug}`}
                        className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-900 shadow-md transition hover:bg-[#034694] hover:text-white"
                    >
                        <Eye size={15} />
                        View Details
                    </Link>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <Link to={`/product/${product.slug}`}>
                    <h3 className="line-clamp-1 text-base font-extrabold text-slate-900 transition-colors hover:text-[#034694]">
                        {product.name}
                    </h3>
                </Link>

                <p className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-xs leading-relaxed text-slate-500">
                    {product.description ||
                        "Official Chelsea Football Club merchandise."}
                </p>

                <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                        <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            Price
                        </span>

                        <span className="text-xl font-extrabold text-[#034694]">
                            KSh{" "}
                            {Number(product.price).toLocaleString()}
                        </span>
                    </div>

                    {stock > 0 && (
                        <span
                            className={`text-xs font-bold ${
                                stock <= 5
                                    ? "text-rose-600"
                                    : "text-emerald-600"
                            }`}
                        >
                            {stock} in stock
                        </span>
                    )}
                </div>

                {stock > 0 ? (
                    <>
                        <div className="mt-4">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-700">
                                    Select Size
                                </span>

                                {selectedSize && (
                                    <span className="text-xs font-bold text-[#034694]">
                                        {selectedSize}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {SIZES.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() =>
                                            setSelectedSize(size)
                                        }
                                        aria-label={`Select size ${size}`}
                                        aria-pressed={
                                            selectedSize === size
                                        }
                                        className={`flex h-9 min-w-9 items-center justify-center rounded-lg border-2 px-2.5 text-xs font-bold transition ${
                                            selectedSize === size
                                                ? "border-[#034694] bg-[#034694] text-white shadow-sm"
                                                : "border-slate-200 bg-white text-slate-700 hover:border-[#034694] hover:text-[#034694]"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#034694] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#012A57] hover:shadow-lg active:scale-[0.98]"
                        >
                            <ShoppingCart size={17} />
                            Add To Cart
                        </button>
                    </>
                ) : (
                    <StockNotification product={product} />
                )}
            </div>
        </article>
    );
}
