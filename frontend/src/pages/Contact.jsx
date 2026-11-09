import { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Send,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/api";

export default function Contact() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    function validate() {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Please enter your name.";
        } else if (form.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters.";
        }

        if (!form.email.trim()) {
            newErrors.email = "Please enter your email.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (form.phone.trim() && !/^[0-9+\s()-]{7,20}$/.test(form.phone)) {
            newErrors.phone = "Please enter a valid phone number.";
        }

        if (!form.subject.trim()) {
            newErrors.subject = "Please enter a subject.";
        } else if (form.subject.trim().length < 3) {
            newErrors.subject = "Subject must be at least 3 characters.";
        }

        if (!form.message.trim()) {
            newErrors.message = "Please enter your message.";
        } else if (form.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) {
            toast.error("Please correct the highlighted fields.");
            return;
        }

        setLoading(true);

        try {
            await api.post("/contact", {
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                subject: form.subject.trim(),
                message: form.message.trim(),
            });

            toast.success(
                "Message sent successfully! We'll get back to you soon. 💙"
            );

            // Clear form after successful submission
            setForm({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });

            setErrors({});

        } catch (error) {
            console.error(error);

            const backendErrors = error.response?.data?.errors;

            if (backendErrors) {
                setErrors({
                    name: backendErrors.name?.[0] || "",
                    email: backendErrors.email?.[0] || "",
                    phone: backendErrors.phone?.[0] || "",
                    subject: backendErrors.subject?.[0] || "",
                    message: backendErrors.message?.[0] || "",
                });
            }

            toast.error(
                error.response?.data?.message ||
                "Unable to send your message. Please try again."
            );

        } finally {
            setLoading(false);
        }
    }

    const inputClass = (field) =>
        `w-full border bg-[#fbfaf7] px-4 py-3.5 outline-none transition ${
            errors[field]
                ? "border-red-500"
                : "border-slate-300 focus:border-[#034694]"
        }`;

    return (
        <div className="bg-[#f8f7f3]">

            {/* Header */}
            <section className="border-b border-slate-200 bg-[#f2f0e9] py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">

                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#034694]">
                        Contact
                    </p>

                    <h1 className="mt-4 font-serif text-4xl font-bold text-[#111820] sm:text-6xl">
                        How can we help?
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                        Have a question about an order, product or delivery?
                        Send us a message and we will get back to you.
                    </p>

                </div>
            </section>

            {/* Contact Section */}
            <section className="py-10 sm:py-14">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid lg:grid-cols-5 gap-12">

                        {/* Contact information */}
                        <div className="lg:col-span-2">

                            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#034694]">
                                Customer support
                            </p>

                            <h2 className="mt-3 font-serif text-3xl font-bold text-[#111820] sm:text-4xl">
                                Talk to a person.
                            </h2>

                            <p className="text-gray-600 leading-7 mt-6">
                                Whether you need help choosing the right
                                jersey, checking an order or simply want to
                                talk football, send us a message.
                            </p>

                            <div className="space-y-6 mt-10">

                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-white text-[#034694]">
                                        <MapPin className="text-[#034694]" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold">
                                            Location
                                        </h3>
                                        <p className="text-gray-600 mt-1">
                                            Nairobi, Kenya
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-white text-[#034694]">
                                        <Phone className="text-[#034694]" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold">
                                            Phone
                                        </h3>
                                        <p className="text-gray-600 mt-1">
                                            +254 759 490 467
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-white text-[#034694]">
                                        <Mail className="text-[#034694]" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold">
                                            Email
                                        </h3>
                                        <p className="text-gray-600 mt-1">
                                            support@carefreechelsea.com
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Form */}
                        <div className="lg:col-span-3">

                            <div className="border border-slate-200 bg-white p-5 sm:p-8 md:p-10">

                                <form onSubmit={handleSubmit} noValidate>

                                    <div className="grid md:grid-cols-2 gap-6">

                                        {/* Name */}
                                        <div>
                                            <label className="block font-semibold mb-2">
                                                Full Name *
                                            </label>

                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Your name"
                                                className={inputClass("name")}
                                            />

                                            {errors.name && (
                                                <p className="text-red-500 text-sm mt-2">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block font-semibold mb-2">
                                                Email Address *
                                            </label>

                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="you@example.com"
                                                className={inputClass("email")}
                                            />

                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-2">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                    </div>

                                    {/* Phone + Subject */}
                                    <div className="grid md:grid-cols-2 gap-6 mt-6">

                                        <div>
                                            <label className="block font-semibold mb-2">
                                                Phone Number
                                            </label>

                                            <input
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder="+254..."
                                                className={inputClass("phone")}
                                            />

                                            {errors.phone && (
                                                <p className="text-red-500 text-sm mt-2">
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block font-semibold mb-2">
                                                Subject *
                                            </label>

                                            <input
                                                type="text"
                                                name="subject"
                                                value={form.subject}
                                                onChange={handleChange}
                                                placeholder="How can we help?"
                                                className={inputClass("subject")}
                                            />

                                            {errors.subject && (
                                                <p className="text-red-500 text-sm mt-2">
                                                    {errors.subject}
                                                </p>
                                            )}
                                        </div>

                                    </div>

                                    {/* Message */}
                                    <div className="mt-6">

                                        <label className="block font-semibold mb-2">
                                            Message *
                                        </label>

                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            rows="7"
                                            placeholder="Write your message..."
                                            className={inputClass("message")}
                                        />

                                        <div className="flex justify-between mt-2">

                                            {errors.message ? (
                                                <p className="text-red-500 text-sm">
                                                    {errors.message}
                                                </p>
                                            ) : (
                                                <span />
                                            )}

                                            <span className="text-sm text-gray-400">
                                                {form.message.length}/2000
                                            </span>

                                        </div>

                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="mt-8 flex w-full items-center justify-center gap-3 bg-[#071a35] py-4 font-bold text-white transition hover:bg-[#034694] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {loading
                                            ? "Sending..."
                                            : "Send Message"}

                                        {!loading && <Send size={20} />}
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}
