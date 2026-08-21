import { Link } from "react-router-dom";
import { Eye, ShoppingCart } from "lucide-react";
import { useCart } from "../CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">

            {/* Product Image */}

            <div className="relative overflow-hidden">

                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 duration-500"
                />

                {/* Category */}

                <span className="absolute top-4 left-4 bg-[#034694] text-white px-4 py-2 rounded-full text-xs font-bold">

                    {product.category}

                </span>

                {/* Hover Buttons */}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">

                    <Link
                        to={`/product/${product.slug}`}
                        className="text-sm font-semibold hover:text-[#034694]"
                    >
                        Details
                    </Link>

                    <button
                    onClick={() => {
                        addToCart(product);
                        toast.success(`${product.name} added to cart`);
                    }}
                    className="bg-yellow-400 p-4 rounded-full hover:bg-white transition"
                >
                    <ShoppingCart size={20} />
                </button>

                </div>

            </div>

            {/* Details */}

            <div className="p-6">

                <h3 className="text-xl font-black text-slate-900 line-clamp-1">

                    {product.name}

                </h3>

                <p className="text-gray-500 mt-3 line-clamp-2">

                    {product.description}

                </p>

                <p className="text-sm text-gray-400 mt-3">

                    {product.delivery_estimate}

                </p>

                <div className="flex justify-between items-center mt-6">

                    <span className="text-3xl font-black text-[#034694]">

                        KES {Number(product.price).toLocaleString()}

                    </span>

                    <span
                        className={`font-semibold ${
                            product.stock > 10
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {product.stock} left
                    </span>

                </div>

                <button
                    onClick={() => {
                        addToCart(product);
                        toast.success(`${product.name} added to cart`);
                    }}
                    className="mt-8 w-full bg-[#034694] hover:bg-[#012A57] text-white py-4 rounded-xl font-bold transition"
                >
                    Add To Cart
                </button>

            </div>

        </div>
    );
}