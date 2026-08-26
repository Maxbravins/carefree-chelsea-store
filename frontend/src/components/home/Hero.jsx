import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#021B3A] via-[#034694] to-[#0055B8]">
      {/* Background */}

      <div className="absolute inset-0">
        <img
          src="/images/chelsea-nike-home.avif"
          alt="Chelsea"
          className="w-full h-full object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#021B3A]/95 via-[#034694]/80 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 items-center min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] gap-10 lg:gap-16 py-14 lg:py-0">
          {/* LEFT */}

          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-yellow-300 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold">
              ⚽ Official Chelsea Fan Store
            </span>

            <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              Wear The
              <span className="block text-yellow-400">Pride Of London</span>
            </h1>

            <p className="mt-8 text-base sm:text-lg md:text-xl text-blue-100 leading-7 sm:leading-8 md:leading-9 max-w-xl mx-auto lg:mx-0">
              Discover authentic Chelsea FC jerseys, training wear, retro
              collections and exclusive fan merchandise delivered across Kenya.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 mt-12">
              <Link
                to="/shop"
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-xl flex items-center gap-3 transition duration-300 shadow-xl"
              >
                <ShoppingBag size={22} />
                Shop Now
              </Link>

              <Link
                to="/shop"
                className="border-2 border-white text-white hover:bg-white hover:text-[#034694] px-8 py-4 rounded-xl flex items-center gap-3 font-bold transition duration-300"
              >
                Explore Collection
                <ArrowRight size={20} />
              </Link>
            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 lg:mt-20">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-yellow-400">
                  5K+
                </h2>

                <p className="text-blue-200 mt-2 text-xs sm:text-sm md:text-base">
                  Happy Fans
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-yellow-400">
                  100+
                </h2>

                <p className="text-blue-200 mt-2 text-xs sm:text-sm md:text-base">
                  Official Products
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-yellow-400">
                  24/7
                </h2>

                <p className="text-blue-200 mt-2 text-xs sm:text-sm md:text-base">
                  Customer Support
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="hidden lg:flex justify-center relative">
            <div className="relative">
              <div className="absolute -inset-10 bg-yellow-400 rounded-full blur-3xl opacity-20"></div>

              <img
                src="/images/chelsea-nike-home.avif"
                alt="Chelsea Home Kit"
                className="relative w-[550px] drop-shadow-2xl hover:scale-105 transition duration-500"
              />

              {/* Floating Card */}

              <div className="absolute top-16 left-0 xl:-left-10 bg-white rounded-2xl shadow-2xl p-5">
                <p className="text-gray-500 text-sm">Best Seller</p>

                <h3 className="font-black mt-1">Home Kit 2026/27</h3>

                <p className="text-[#034694] font-black text-2xl mt-2">
                  KES 2,500
                </p>
              </div>

              <div className="absolute bottom-10 right-0 xl:-right-10 bg-white rounded-2xl shadow-2xl p-5">
                <p className="text-green-600 font-bold">✓ In Stock</p>

                <p className="text-gray-500 mt-2">Fast Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
