import {
    Truck,
    ShieldCheck,
    BadgeCheck,
    RotateCcw,
    CheckCircle2,
} from "lucide-react";

const features = [
    {
        icon: Truck,
        title: "Fast Nationwide Delivery",
        text: "Reliable delivery across Kenya within 2–5 business days with order tracking.",
    },
    {
        icon: ShieldCheck,
        title: "Secure M-Pesa Payments",
        text: "Checkout confidently using secure M-Pesa STK Push with encrypted transactions.",
    },
    {
        icon: BadgeCheck,
        title: "Official Chelsea Quality",
        text: "Premium Chelsea merchandise crafted to official standards for every supporter.",
    },
    {
        icon: RotateCcw,
        title: "Easy Returns",
        text: "Enjoy a hassle-free 7-day return policy on eligible products.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#021B3A] via-[#034694] to-[#0055B8] py-28">

            {/* Background Decoration */}

            <div className="absolute inset-0">

                <div className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>

                <div className="absolute -bottom-40 -right-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>

            </div>

            <div className="relative max-w-7xl mx-auto px-6">

                {/* Heading */}

                <div className="text-center max-w-3xl mx-auto">

                    <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-yellow-400 px-5 py-2 rounded-full uppercase tracking-[0.35em] text-sm font-bold">

                        Why Choose Us

                    </span>

                    <h2 className="mt-8 text-6xl font-black text-white leading-tight">

                        Built For Every
                        <span className="block text-yellow-400">
                            Chelsea Supporter
                        </span>

                    </h2>

                    <p className="mt-8 text-xl leading-9 text-blue-100">

                        We combine premium quality merchandise,
                        secure payments and fast nationwide delivery
                        to provide the ultimate Chelsea shopping experience.

                    </p>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-20 mb-20">

                    <div className="text-center">

                        <h3 className="text-5xl font-black text-yellow-400">
                            5K+
                        </h3>

                        <p className="text-blue-100 mt-3">
                            Happy Customers
                        </p>

                    </div>

                    <div className="text-center">

                        <h3 className="text-5xl font-black text-yellow-400">
                            100+
                        </h3>

                        <p className="text-blue-100 mt-3">
                            Official Products
                        </p>

                    </div>

                    <div className="text-center">

                        <h3 className="text-5xl font-black text-yellow-400">
                            24/7
                        </h3>

                        <p className="text-blue-100 mt-3">
                            Customer Support
                        </p>

                    </div>

                    <div className="text-center">

                        <h3 className="text-5xl font-black text-yellow-400">
                            100%
                        </h3>

                        <p className="text-blue-100 mt-3">
                            Secure Checkout
                        </p>

                    </div>

                </div>

                {/* Cards */}

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

                    {features.map((feature) => {

                        const Icon = feature.icon;

                        return (

                            <div
                                key={feature.title}
                                className="group bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-300"
                            >

                                <div className="w-18 h-18 rounded-2xl bg-[#034694] group-hover:bg-yellow-400 flex items-center justify-center transition duration-300 mb-8">

                                    <Icon
                                        size={32}
                                        className="text-yellow-400 group-hover:text-[#034694] transition"
                                    />

                                </div>

                                <h3 className="text-2xl font-black text-slate-900">

                                    {feature.title}

                                </h3>

                                <p className="mt-5 text-gray-600 leading-8">

                                    {feature.text}

                                </p>

                                <div className="flex items-center gap-3 mt-8">

                                    <CheckCircle2
                                        size={20}
                                        className="text-green-600"
                                    />

                                    <span className="font-semibold text-[#034694]">

                                        Trusted by Chelsea Fans

                                    </span>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}