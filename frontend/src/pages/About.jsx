import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="bg-[#f8f7f3]">
      <section className="border-b border-slate-200 bg-[#f2f0e9] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#034694]">About Kit Sphere</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight text-[#111820] sm:text-6xl">
            The shirt is part of the story.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            The club you follow. The country you cheer for. The shirt you keep reaching for. We bring club and national team jerseys together for supporters in Kenya.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          <figure className="bg-[#eeece5] p-3 sm:p-5">
            <div className="flex aspect-[4/5] items-center justify-center">
              <img src="/images/chelsea-nike-home.avif" alt="Chelsea home jersey" className="h-full w-full object-contain mix-blend-multiply" />
            </div>
            <figcaption className="border-t border-slate-300 pt-3 text-xs font-bold uppercase tracking-wider text-slate-600">Club colours</figcaption>
          </figure>
          <figure className="mt-8 bg-[#eeece5] p-3 sm:mt-12 sm:p-5">
            <div className="flex aspect-[4/5] items-center justify-center">
              <img src="/images/argentina-26-home-authentic-kids.avif" alt="Argentina home jersey" className="h-full w-full object-contain mix-blend-multiply" />
            </div>
            <figcaption className="border-t border-slate-300 pt-3 text-xs font-bold uppercase tracking-wider text-slate-600">Country pride</figcaption>
          </figure>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#034694]">Our point of view</p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#111820] sm:text-4xl">A place for every side you stand with.</h2>
          <p className="mt-5 leading-7 text-slate-600">
            Football shirts move between matchday, memory and everyday life. We are building a shop where it is easy to find the team, country and style you came for.
          </p>
          <p className="mt-4 leading-7 text-slate-600">
            Browse a team collection to compare its available home, away and other jerseys. Each listing shows its own price, stock and delivery estimate.
          </p>
          <Link to="/shop" className="mt-7 inline-flex items-center gap-2 border-b border-[#034694] pb-1 text-sm font-bold text-[#034694] hover:border-transparent">
            Explore the collection <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 md:gap-10">
          <article className="border-t-2 border-[#034694] pt-4">
            <p className="text-xs font-extrabold tracking-widest text-[#034694]">01 / CLUBS</p>
            <h3 className="mt-3 font-serif text-2xl font-bold text-[#111820]">Follow your badge</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Find the clubs whose colours are part of your week.</p>
          </article>
          <article className="border-t-2 border-[#034694] pt-4">
            <p className="text-xs font-extrabold tracking-widest text-[#034694]">02 / COUNTRIES</p>
            <h3 className="mt-3 font-serif text-2xl font-bold text-[#111820]">Wear your colours</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Browse national sides and their available jerseys.</p>
          </article>
          <article className="border-t-2 border-[#034694] pt-4">
            <p className="text-xs font-extrabold tracking-widest text-[#034694]">03 / THE DETAILS</p>
            <h3 className="mt-3 font-serif text-2xl font-bold text-[#111820]">Know what is in stock</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Check sizing, price and delivery details before checkout.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
