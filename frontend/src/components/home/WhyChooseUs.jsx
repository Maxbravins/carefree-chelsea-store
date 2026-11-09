import { Link } from "react-router-dom";

const notes = [
  {
    number: "01",
    title: "Choose your side",
    text: "Browse club collections and national teams in the same shop.",
  },
  {
    number: "02",
    title: "Check each shirt",
    text: "See its price, available stock and delivery estimate before you order.",
  },
  {
    number: "03",
    title: "Pay with M-Pesa",
    text: "Use the mobile money checkout when you are ready.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="border-y border-slate-200 bg-[#f2f0e9] py-14 sm:py-18">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#034694]">Good to know</p>
          <h2 className="mt-3 max-w-md font-serif text-3xl font-bold leading-tight text-[#111820] sm:text-4xl">
            The details that make shopping easier.
          </h2>
          <Link to="/help" className="mt-5 inline-flex border-b border-[#034694] pb-1 text-sm font-bold text-[#034694] hover:border-transparent">
            Read help & FAQs
          </Link>
        </div>

        <div className="divide-y divide-slate-300 border-y border-slate-300">
          {notes.map((note) => (
            <article key={note.number} className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr] sm:gap-5">
              <span className="text-xs font-extrabold tracking-widest text-[#034694]">{note.number}</span>
              <div className="grid gap-1 sm:grid-cols-[minmax(10rem,0.7fr)_1fr] sm:gap-6">
                <h3 className="font-bold text-slate-900">{note.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{note.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
