import {
  ArrowRight,
  CheckCircle2,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
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

        <div className="absolute inset-0 bg-gradient-to-r from-[#021B3A]/95 via-[#034694]/80 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 items-center min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] gap-10 lg:gap-12 xl:gap-16 py-14 lg:py-0">

          {/* ================= LEFT ================= */}
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-yellow-300 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold">
              ⚽ Official Chelsea Fan Store
            </span>

            <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              Wear The
              <span className="block text-yellow-400">
                Pride Of London
              </span>
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

          {/* ================= RIGHT / PRODUCT ================= */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-[460px] xl:w-[540px]">

              {/* Glow */}
              <div className="absolute -inset-10 bg-yellow-400 rounded-full blur-3xl opacity-20" />

              {/* Product Image */}
              <img
                src="/images/chelsea-nike-home.avif"
                alt="Chelsea Home Kit"
                className="
                  relative
                  z-10
                  w-full
                  drop-shadow-2xl
                  transition-transform
                  duration-500
                  hover:scale-[1.03]
                "
              />

              {/* ================= BEST SELLER CARD ================= */}
              <div
                className="
                  absolute
                  z-20
                  top-[80%]
                  left-[-10px]
                  xl:left-[-28px]

                  w-[190px]

                  bg-white
                  border
                  border-gray-100
                  rounded-2xl
                  shadow-[0_15px_40px_rgba(0,0,0,0.18)]
                  p-4

                  transition-transform
                  duration-300
                  hover:-translate-y-1
                "
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                  <Star
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  Best Seller
                </div>

                <h3 className="mt-2 text-sm font-black text-gray-900">
                  Home Kit 2026/27
                </h3>

                <p className="mt-1 text-xl font-black text-[#034694]">
                  KES 2,500
                </p>
              </div>

              {/* ================= AVAILABILITY CARD ================= */}
              <div
                className="
                  absolute
                  z-20
                  bottom-[82%]
                  right-[-5px]
                  xl:right-[-48px]

                  w-[180px]

                  bg-white
                  border
                  border-gray-100
                  rounded-2xl
                  shadow-[0_15px_40px_rgba(0,0,0,0.18)]
                  p-4

                  transition-transform
                  duration-300
                  hover:-translate-y-1
                "
              >
                {/* Stock */}
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={18}
                    className="text-green-500"
                  />

                  <span className="text-sm font-bold text-green-600">
                    In Stock
                  </span>
                </div>

                {/* Delivery */}
                <div className="flex items-center gap-2 mt-3">
                  <Truck
                    size={17}
                    className="text-[#034694]"
                  />

                  <span className="text-xs font-medium text-gray-500">
                    Fast delivery across Kenya
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
