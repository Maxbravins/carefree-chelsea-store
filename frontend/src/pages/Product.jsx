import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    ShoppingCart,
    Truck,
    ShieldCheck,
    Star,
} from "lucide-react";

import { getProduct } from "../services/productService";
import { useCart } from "../CartContext";

export default function Product() {

    const { slug } = useParams();

    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

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

    return (

        <section className="bg-gray-50 py-20">

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Image */}

                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-[700px] object-cover"
                        />

                    </div>

                    {/* Details */}

                    <div>

                        <span className="bg-[#034694] text-white px-4 py-2 rounded-full text-sm">

                            {product.category}

                        </span>

                        <h1 className="text-5xl font-black mt-6">

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

                        <div className="mt-12">

                            <button
                                onClick={() => addToCart(product)}
                                className="w-full bg-[#034694] hover:bg-[#012A57] text-white py-5 rounded-xl text-lg font-bold flex justify-center items-center gap-3 transition"
                            >

                                <ShoppingCart size={24} />

                                Add To Cart

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