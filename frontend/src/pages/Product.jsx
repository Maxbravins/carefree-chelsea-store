import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    ShoppingCart,
    Truck,
    ShieldCheck,
    Star,
    Heart,
} from "lucide-react";
import toast from "react-hot-toast";

import { getProduct } from "../services/productService";
import { useCart } from "../CartContext";
import { useWishlist } from "../WishlistContext";

const SIZES = ["S", "M", "L", "XL", "XXL"];

export default function Product() {

    const { slug } = useParams();

    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {

        loadProduct();

    }, [slug]);

    async function loadProduct() {

        try {

            const data = await getProduct(slug);

            setProduct(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    function handleAddToCart() {

        if (!selectedSize) {
            toast.error("Please select a size first.");
            return;
        }

        addToCart({ ...product, size: selectedSize });
        toast.success(`Added ${product.name} (${selectedSize}) to cart.`);

    }

    function handleToggleWishlist() {

        toggleWishlist(product);
        toast.success(
            isInWishlist(product.id)
                ? `${product.name} removed from wishlist`
                : `${product.name} added to wishlist`
        );

    }

    if (loading) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                <h2 className="text-2xl font-bold">
                    Loading Product...
                </h2>

            </div>

        );

    }

    if (!product) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                <h2 className="text-2xl font-bold">
                    Product Not Found
                </h2>

            </div>

        );

    }

    const inWishlist = isInWishlist(product.id);

    return (

        <section className="bg-gray-50 py-10 sm:py-16 lg:py-20">

            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">

                    {/* Image */}

                    <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden">

                        <button
                            type="button"
                            onClick={handleToggleWishlist}
                            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                            aria-pressed={inWishlist}
                            className={`absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full shadow transition ${
                                inWishlist
                                    ? "bg-red-600 text-white"
                                    : "bg-white/90 text-slate-700 hover:text-red-600"
                            }`}
                        >
                            <Heart size={20} fill={inWishlist ? "currentColor" : "none"} />
                        </button>

                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-80 sm:h-[480px] lg:h-[650px] object-cover"
                        />

                    </div>

                    {/* Details */}

                    <div>

                        <span className="bg-[#034694] text-white px-4 py-2 rounded-full text-sm font-semibold">

                            {product.category}

                        </span>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6">

                            {product.name}

                        </h1>

                        <div className="flex items-center gap-1 mt-5">

                            {[1,2,3,4,5].map((star)=>(

                                <Star
                                    key={star}
                                    size={20}
                                    fill="#FFD700"
                                    strokeWidth={0}
                                />

                            ))}

                            <span className="ml-2 text-gray-500">

                                (5.0)

                            </span>

                        </div>

                        <p className="text-4xl font-black text-[#034694] mt-8">

                            KES {Number(product.price).toLocaleString()}

                        </p>

                        <p className="text-gray-600 leading-8 mt-8">

                            {product.description}

                        </p>

                        <div className="mt-10 space-y-5">

                            <div className="flex items-center gap-4">

                                <Truck className="text-[#034694]" />

                                <span>

                                    {product.delivery_estimate}

                                </span>

                            </div>

                            <div className="flex items-center gap-4">

                                <ShieldCheck className="text-green-600" />

                                <span>

                                    100% Authentic Chelsea Merchandise

                                </span>

                            </div>

                        </div>

                        {/* Size Selector */}

                        <div className="mt-10">

                            <h3 className="font-bold text-lg mb-3">
                                Select Size
                            </h3>

                            <div className="flex flex-wrap gap-3">

                                {SIZES.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-14 h-14 rounded-xl border-2 font-bold transition ${
                                            selectedSize === size
                                                ? "bg-[#034694] border-[#034694] text-white"
                                                : "border-gray-300 text-gray-700 hover:border-[#034694]"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}

                            </div>

                        </div>

                        <div className="mt-10 flex gap-3">

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-[#034694] hover:bg-[#012A57] text-white py-5 rounded-xl text-lg font-bold flex justify-center items-center gap-3 transition"
                            >

                                <ShoppingCart size={24} />

                                Add To Cart

                            </button>

                            <button
                                type="button"
                                onClick={handleToggleWishlist}
                                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                                className={`px-6 rounded-xl border-2 flex items-center justify-center transition ${
                                    inWishlist
                                        ? "bg-red-50 border-red-600 text-red-600"
                                        : "border-gray-300 text-gray-700 hover:border-[#034694] hover:text-[#034694]"
                                }`}
                            >
                                <Heart size={24} fill={inWishlist ? "currentColor" : "none"} />
                            </button>

                        </div>

                        <div className="mt-10">

                            <h3 className="font-bold text-xl">

                                Availability

                            </h3>

                            <p className="mt-3 text-green-600 font-semibold">

                                {product.stock} items in stock

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}
