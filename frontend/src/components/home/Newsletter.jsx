import { useState } from "react";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/api";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await api.post("/subscribers", { email });
      toast.success("You are subscribed to Kit Sphere!");
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-end lg:gap-16">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#034694]">The Kit Sphere letter</p>
          <h2 className="mt-3 max-w-lg font-serif text-3xl font-bold leading-tight text-[#111820] sm:text-4xl">
            New shirts, when they arrive.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            A short note about new arrivals, restocks and shop updates.
          </p>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="min-w-0 flex-1 border border-slate-300 bg-[#f8f7f3] px-4 py-3.5 text-sm outline-none focus:border-[#034694]"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-[#071a35] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#034694] disabled:opacity-60"
            >
              {loading ? "Joining…" : "Sign me up"}<ArrowRight size={16} />
            </button>
          </form>
          <p className="mt-3 text-xs text-slate-500">You can unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
