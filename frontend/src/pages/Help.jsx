import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, CircleHelp, Mail, MessageCircle } from "lucide-react";

const questions = [
  {
    question: "How do I find a jersey for my team or country?",
    answer: "Open the shop and use the Club & country filter, then choose a team and kit type. You can also search by a team or country name.",
  },
  {
    question: "How do I choose the right size?",
    answer: "Open the jersey product page and select one of the available sizes before adding it to your cart. If you are unsure, contact us with the jersey name and the size you usually wear.",
  },
  {
    question: "Which payment methods can I use?",
    answer: "Checkout supports M-Pesa. Follow the checkout instructions and approve the payment prompt on the phone number you provide.",
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery is available across Kenya. The estimated delivery window is shown on each product page; most orders are expected within 2–5 business days.",
  },
  {
    question: "Can I return or exchange a jersey?",
    answer: "Eligible products can be returned within 7 days. Contact support before sending an item back so we can confirm eligibility and guide you through the process.",
  },
  {
    question: "How can I get help with an order?",
    answer: "Send us a message from the Contact page with your order number and the email address used at checkout. We will help you with payment, delivery or product questions.",
  },
];

export default function Help() {
  const [openQuestion, setOpenQuestion] = useState(0);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#071a35] px-4 py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-yellow-400"><CircleHelp size={26} /></span>
          <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.24em] text-blue-200">The Jersey Room support</p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">How can we help?</h1>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-blue-100">Answers about finding your jersey, sizing, payment, delivery and returns.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_300px]">
        <div className="space-y-3">
          {questions.map(({ question, answer }, index) => {
            const isOpen = openQuestion === index;
            const answerId = `help-answer-${index}`;
            return (
              <article key={question} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <h2>
                  <button type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenQuestion(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-bold text-slate-900 sm:px-6">
                    {question}
                    <ChevronDown size={19} className={`shrink-0 text-[#034694] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </h2>
                {isOpen && <div id={answerId} className="px-5 pb-5 leading-7 text-slate-600 sm:px-6">{answer}</div>}
              </article>
            );
          })}
        </div>

        <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#034694]"><MessageCircle size={22} /></span>
          <h2 className="mt-5 text-xl font-black text-slate-900">Still need a hand?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Send our team a message and include your order number if you have one.</p>
          <Link to="/contact" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#034694] px-5 py-3 font-bold text-white transition hover:bg-[#012A57]">Contact support <ArrowRight size={17} /></Link>
          <a href="mailto:support@carefreechelsea.com" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#034694] hover:underline"><Mail size={16} /> Email support</a>
        </aside>
      </section>
    </main>
  );
}
