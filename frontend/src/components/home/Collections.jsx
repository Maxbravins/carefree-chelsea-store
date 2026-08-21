import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import homeKit from "../../assets/chelsea-nike-home.avif";
import awayKit from "../../assets/chelsea-nike-away-stadium-shirt-2025-26.avif";
import thirdKit from "../../assets/chelsea-nike-third-stadium-shirt.avif";
import trainingKit from "../../assets/chelsea-nike-strike-training.avif";

const collections = [
  {
    title: "Home Kit",
    image: homeKit,
    description: "Wear the iconic Chelsea blue for the new season.",
  },
  {
    title: "Away Kit",
    image: awayKit,
    description: "Designed for unforgettable away nights.",
  },
  {
    title: "Third Kit",
    image: thirdKit,
    description: "Bold design inspired by London's culture.",
  },
  {
    title: "Training Wear",
    image: trainingKit,
    description: "Train like the Blues every single day.",
  },
];

export default function Collections() {
  return (
    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-end mb-14">

          <div>

            <p className="uppercase tracking-[0.35em] text-[#034694] font-semibold">
              Collections
            </p>

            <h2 className="text-5xl font-black mt-3">
              Shop By Collection
            </h2>

            <p className="text-gray-500 mt-5 max-w-2xl">
              Discover authentic Chelsea FC merchandise designed for every supporter.
            </p>

          </div>

          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 font-bold text-[#034694] hover:text-yellow-500 transition"
          >
            View All
            <ArrowRight size={18} />
          </Link>

        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8">

          {collections.map((item) => (

            <Link
              key={item.title}
              to="/shop"
              className="group relative rounded-3xl overflow-hidden h-[500px] shadow-lg hover:shadow-2xl transition duration-500"
            >

              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8">

                <span className="inline-block bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs uppercase tracking-widest mb-4">
                  Official Collection
                </span>

                <h3 className="text-3xl font-black text-white">
                  {item.title}
                </h3>

                <p className="text-gray-200 mt-3 leading-7">
                  {item.description}
                </p>

                <div className="mt-8 inline-flex items-center gap-2 bg-white text-[#034694] px-6 py-3 rounded-xl font-bold group-hover:bg-yellow-400 transition">

                  Shop Now

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 duration-300"
                  />

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}