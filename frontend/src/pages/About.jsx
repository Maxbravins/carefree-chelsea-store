import {
    Heart,
    ShieldCheck,
    Truck,
    Users,
    Award,
} from "lucide-react";

export default function About() {
    const values = [
        {
            icon: Heart,
            title: "Built by Chelsea Fans",
            text: "Carefree Chelsea Store was created by passionate Chelsea supporters for fellow Blues fans.",
        },
        {
            icon: ShieldCheck,
            title: "Quality Products",
            text: "We focus on quality Chelsea merchandise, jerseys, accessories and fan wear.",
        },
        {
            icon: Truck,
            title: "Reliable Delivery",
            text: "We deliver Chelsea merchandise to supporters across Kenya.",
        },
        {
            icon: Users,
            title: "Fan Community",
            text: "We are more than a store. We are building a community of passionate Chelsea supporters.",
        },
    ];

    return (
        <div className="bg-white">

            {/* Hero */}
            <section className="bg-gradient-to-r from-[#021B3A] via-[#034694] to-[#0055B8] text-white py-24">
                <div className="max-w-6xl mx-auto px-6 text-center">

                    <p className="text-yellow-400 uppercase tracking-[0.3em] font-bold">
                        About Us
                    </p>

                    <h1 className="text-5xl md:text-6xl font-black mt-6">
                        Carefree Chelsea
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-100 mt-6 max-w-3xl mx-auto leading-8">
                        Your home for Chelsea passion, merchandise and
                        everything that makes being a Blue special.
                    </p>

                </div>
            </section>

            {/* Story */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">

                    <div className="grid lg:grid-cols-2 gap-14 items-center">

                        <div>
                            <p className="text-[#034694] uppercase tracking-widest font-bold">
                                Our Story
                            </p>

                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4">
                                More Than A Store
                            </h2>

                            <p className="text-gray-600 text-lg leading-8 mt-6">
                                Carefree Chelsea Store is a Chelsea-focused
                                merchandise store created for supporters who
                                proudly carry the Blues wherever they go.
                            </p>

                            <p className="text-gray-600 text-lg leading-8 mt-5">
                                From matchday jerseys to accessories and
                                collectibles, our goal is to make it easier
                                for Chelsea fans in Kenya to represent the
                                club they love.
                            </p>

                            <div className="flex items-center gap-3 mt-8">
                                <Award className="text-yellow-500" size={32} />

                                <span className="font-bold text-gray-900">
                                    Carefree. Wherever you are.
                                </span>
                            </div>
                        </div>

                        <div className="rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="/images/chelsea-home.jpg"
                                alt="Chelsea"
                                className="w-full h-[420px] object-cover"
                            />
                        </div>

                    </div>

                </div>
            </section>

            {/* Values */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-14">
                        <p className="text-[#034694] uppercase tracking-widest font-bold">
                            Why Carefree Chelsea
                        </p>

                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4">
                            What We Stand For
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {values.map((value) => {
                            const Icon = value.icon;

                            return (
                                <div
                                    key={value.title}
                                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-[#034694]/10 flex items-center justify-center">
                                        <Icon
                                            size={28}
                                            className="text-[#034694]"
                                        />
                                    </div>

                                    <h3 className="text-xl font-bold mt-6">
                                        {value.title}
                                    </h3>

                                    <p className="text-gray-600 leading-7 mt-4">
                                        {value.text}
                                    </p>
                                </div>
                            );
                        })}

                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-6 text-center">

                    <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                        Ready to Represent the Blues?
                    </h2>

                    <p className="text-gray-600 text-lg mt-5">
                        Explore our collection and find something that
                        represents your Chelsea pride.
                    </p>

                    <a
                        href="/shop"
                        className="inline-block mt-8 bg-[#034694] hover:bg-[#012A57] text-white font-bold px-10 py-4 rounded-xl transition"
                    >
                        Shop Chelsea Collection
                    </a>

                </div>
            </section>

        </div>
    );
}