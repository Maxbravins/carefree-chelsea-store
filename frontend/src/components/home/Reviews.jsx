import {
    Star,
    BadgeCheck,
    Quote,
} from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Brian Ouma",
        location: "Nairobi",
        review:
            "The quality exceeded my expectations. Delivery was fast and the jersey feels authentic. I will definitely shop here again.",
        image: "https://i.pravatar.cc/150?img=12",
    },
    {
        id: 2,
        name: "Faith Achieng",
        location: "Kisumu",
        review:
            "Very impressed with the customization. My jersey arrived exactly as ordered and the fabric quality is outstanding.",
        image: "https://i.pravatar.cc/150?img=32",
    },
    {
        id: 3,
        name: "Kevin Mutua",
        location: "Mombasa",
        review:
            "Excellent customer service and genuine Chelsea merchandise. The M-Pesa checkout was smooth and delivery was quick.",
        image: "https://i.pravatar.cc/150?img=68",
    },
];

export default function Reviews() {
    return (
        <section className="py-28 bg-white">

            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}

                <div className="text-center max-w-3xl mx-auto">

                    <span className="inline-block bg-blue-100 text-[#034694] px-5 py-2 rounded-full font-bold uppercase tracking-[0.35em] text-sm">

                        Testimonials

                    </span>

                    <h2 className="text-6xl font-black mt-8">

                        Loved By Chelsea Fans

                    </h2>

                    <p className="text-gray-600 text-lg leading-8 mt-6">

                        Thousands of Chelsea supporters trust Carefree Chelsea
                        Store for premium quality merchandise, secure payments
                        and exceptional customer service.

                    </p>

                </div>

                {/* Reviews */}

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 mt-20">

                    {reviews.map((review) => (

                        <div
                            key={review.id}
                            className="group relative bg-gray-50 rounded-3xl p-10 hover:bg-white hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
                        >

                            <Quote
                                size={55}
                                className="absolute top-8 right-8 text-[#034694]/10 group-hover:text-[#034694]/20 transition"
                            />

                            <div className="flex items-center gap-5 mb-8">

                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                                />

                                <div>

                                    <div className="flex items-center gap-2">

                                        <h3 className="text-xl font-black">

                                            {review.name}

                                        </h3>

                                        <BadgeCheck
                                            size={20}
                                            className="text-[#034694]"
                                        />

                                    </div>

                                    <p className="text-gray-500">

                                        {review.location}

                                    </p>

                                    <div className="flex gap-1 mt-2">

                                        {[1,2,3,4,5].map((star) => (

                                            <Star
                                                key={star}
                                                size={18}
                                                fill="#FFD700"
                                                strokeWidth={0}
                                            />

                                        ))}

                                    </div>

                                </div>

                            </div>

                            <p className="text-gray-600 leading-8 italic">

                                "{review.review}"

                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}