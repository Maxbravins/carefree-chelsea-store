import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import { getProducts } from "../../services/productService";

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        try {
            const data = await getProducts();
            setProducts(data.slice(0, 8));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="animate-pulse text-lg text-gray-500">
                        Loading featured products...
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-white">

            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}

                <div className="flex flex-col md:flex-row justify-between items-center mb-14">

                    <div>

                        <p className="uppercase tracking-[5px] text-[#034694] font-semibold">
                            Official Store
                        </p>

                        <h2 className="text-4xl md:text-5xl font-black mt-3">
                            Featured Products
                        </h2>

                        <p className="text-gray-500 mt-4">
                            Official Chelsea merchandise hand-picked for every Blue.
                        </p>

                    </div>

                    <Link
                        to="/shop"
                        className="mt-6 md:mt-0 text-[#034694] font-semibold hover:text-yellow-500 transition"
                    >
                        View All Products →
                    </Link>

                </div>

                {/* Products */}

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {products.map((product) => (

                        <div
                            key={product.id}
                            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow hover:shadow-2xl transition-all duration-500"
                        >

                            {/* Image */}

                            <div className="relative overflow-hidden">

                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-80 object-cover group-hover:scale-110 duration-700"
                                />

                                {/* Category */}

                                <span className="absolute top-4 left-4 bg-[#034694] text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    {product.category}
                                </span>

                                {/* Hover buttons */}

                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-4">

                                    <Link
                                        to={`/product/${product.slug}`}
                                        className="bg-white rounded-full p-3 hover:bg-yellow-400 transition"
                                    >
                                        <Eye size={20} />
                                    </Link>

                                    <button
                                        className="bg-yellow-400 rounded-full p-3 hover:bg-yellow-500 transition"
                                    >
                                        <ShoppingCart size={20} />
                                    </button>

                                </div>

                            </div>

                            {/* Details */}

                            <div className="p-6">

                                <h3 className="text-xl font-bold line-clamp-2">
                                    {product.name}
                                </h3>

                                <p className="text-xs text-gray-500 mt-3">
                                    {product.delivery_estimate}
                                </p>

                                {/* Stock */}

                                <div className="mt-3">

                                    {product.stock > 10 ? (

                                        <span className="text-green-600 text-sm font-semibold">
                                            ✓ In Stock ({product.stock} available)
                                        </span>

                                    ) : (

                                        <span className="text-red-600 text-sm font-semibold">
                                            Only {product.stock} left
                                        </span>

                                    )}

                                </div>

                                {/* Price */}

                                <div className="flex justify-between items-center mt-6">

                                    <span className="text-3xl font-black text-[#034694]">
                                        KES {Number(product.price).toLocaleString()}
                                    </span>

                                    <Link
                                        to={`/product/${product.slug}`}
                                        className="text-sm font-semibold text-[#034694] hover:text-yellow-500 transition"
                                    >
                                        Details →
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}