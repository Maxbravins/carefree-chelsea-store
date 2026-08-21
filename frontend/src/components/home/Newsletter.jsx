import { Mail, ArrowRight } from "lucide-react";

export default function Newsletter() {
    return (
        <section className="relative overflow-hidden py-28 bg-gradient-to-r from-[#021B3A] via-[#034694] to-[#0055B8]">

            {/* Background Decoration */}

            <div className="absolute inset-0">

                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-3xl"></div>

                <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-white/10 rounded-full blur-3xl"></div>

            </div>

            <div className="relative max-w-5xl mx-auto px-6 text-center">

                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md mb-8">

                    <Mail
                        size={36}
                        className="text-yellow-400"
                    />

                </div>

                <span className="uppercase tracking-[0.35em] text-yellow-400 font-bold">

                    Newsletter

                </span>

                <h2 className="text-6xl font-black text-white mt-8 leading-tight">

                    Never Miss A
                    <span className="block text-yellow-400">
                        Chelsea Drop
                    </span>

                </h2>

                <p className="text-blue-100 text-xl leading-9 mt-8 max-w-3xl mx-auto">

                    Join thousands of Chelsea supporters and be the first
                    to know about new kits, exclusive offers, limited editions
                    and matchday promotions.

                </p>

                <form className="mt-14 max-w-3xl mx-auto">

                    <div className="bg-white rounded-2xl p-3 flex flex-col md:flex-row gap-3 shadow-2xl">

                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-6 py-4 rounded-xl outline-none text-lg"
                        />

                        <button
                            type="submit"
                            className="bg-[#034694] hover:bg-[#012A57] text-white font-bold px-10 py-4 rounded-xl flex items-center justify-center gap-3 transition"
                        >

                            Subscribe

                            <ArrowRight size={20} />

                        </button>

                    </div>

                </form>

                <p className="text-blue-200 mt-8">

                    No spam. Unsubscribe anytime.

                </p>

            </div>

        </section>
    );
}