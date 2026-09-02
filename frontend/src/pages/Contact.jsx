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
        `w-full rounded-xl border px-5 py-4 outline-none transition ${
            errors[field]
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-200 focus:border-[#034694] focus:ring-2 focus:ring-blue-100"
        }`;

    return (
        <div className="bg-gray-50">

            {/* Header */}
            <section className="bg-gradient-to-r from-[#021B3A] via-[#034694] to-[#0055B8] text-white py-24">
                <div className="max-w-6xl mx-auto px-6 text-center">

                    <p className="text-yellow-400 uppercase tracking-[0.3em] font-bold">
                        Contact Us
                    </p>

                    <h1 className="text-5xl md:text-6xl font-black mt-5">
                        Let's Talk
                    </h1>

                    <p className="text-blue-100 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
                        Have a question about an order, product or delivery?
                        We're here to help.
                    </p>

                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid lg:grid-cols-5 gap-12">

                        {/* Contact information */}
                        <div className="lg:col-span-2">

                            <p className="text-[#034694] uppercase tracking-widest font-bold">
                                Get In Touch
                            </p>

                            <h2 className="text-4xl font-black text-gray-900 mt-4">
                                We're Here For You
                            </h2>

                            <p className="text-gray-600 leading-7 mt-6">
                                Whether you need help choosing the right
                                jersey, checking an order or simply want to
                                talk Chelsea, send us a message.
                            </p>

                            <div className="space-y-6 mt-10">

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-[#034694]/10 rounded-xl flex items-center justify-center">
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
                                    <div className="w-12 h-12 bg-[#034694]/10 rounded-xl flex items-center justify-center">
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
                                    <div className="w-12 h-12 bg-[#034694]/10 rounded-xl flex items-center justify-center">
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

                            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">

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
                                        className="w-full mt-8 bg-[#034694] hover:bg-[#012A57] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition"
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