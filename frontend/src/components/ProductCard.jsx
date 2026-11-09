import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Zap, Heart } from "lucide-react";
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
        <article className="group flex h-full flex-col overflow-hidden border-b border-slate-200 bg-white transition-colors hover:border-[#034694]">
            <div className="relative overflow-hidden bg-[#eeece5]">
                <Link
                    to={`/product/${product.slug}`}
                    className="block aspect-[4/5]"
                >
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                </Link>

                {product.category && (
                    <span className="absolute left-3 top-3 bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-700">
                        {product.team || product.category}
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
                    <span className="absolute right-3 top-3 flex items-center gap-1 bg-rose-700 px-2.5 py-1.5 text-[10px] font-extrabold text-white">
                        <Zap size={11} />
                        Only {stock} left
                    </span>
                )}

                {stock <= 0 && (
                    <span className="absolute right-3 top-12 bg-slate-900 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
                        Sold Out
                    </span>
                )}

            </div>

            <div className="flex flex-1 flex-col px-1 py-4 sm:px-2">
                <Link to={`/product/${product.slug}`}>
                    <h3 className="line-clamp-1 text-sm font-bold text-slate-900 transition-colors hover:text-[#034694] sm:text-base">
                        {product.name}
                    </h3>
                </Link>

                <p className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-xs leading-relaxed text-slate-500">
                    {product.description ||
                        "Quality football jerseys for every supporter."}
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
                                        className={`flex h-9 min-w-9 items-center justify-center border px-2.5 text-xs font-bold transition ${
                                            selectedSize === size
                                                ? "border-[#034694] bg-[#034694] text-white"
                                                : "border-slate-300 bg-white text-slate-700 hover:border-[#034694] hover:text-[#034694]"
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
                            className="mt-5 flex w-full items-center justify-center gap-2 bg-[#034694] py-3.5 text-sm font-bold text-white transition hover:bg-[#012A57] active:scale-[0.98]"
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
