import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuClock,
  LuFacebook,
  LuInstagram,
  LuTwitter,
  LuLinkedin,
} from "react-icons/lu";

const ContactUs = () => {
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const message = form.get("message")?.toString().trim();

    if (!name || !email || !message) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    // Simulate success for now (no backend)
    setStatus({ type: "success", message: "Thanks! We’ve received your message and will reply soon." });
    e.currentTarget.reset();
  };

  return (
    <div className="bg-white text-slate-700">
      {/* =============== Hero =============== */}
      <section className="relative">
        <div
          className="h-[36vh] sm:h-[42vh] lg:h-[48vh] w-full bg-center bg-cover"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1920&auto=format&fit=crop")',
          }}
          aria-label="Contact banner background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-10">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Contact Us</h1>
            <p className="mt-2 text-white/90">
              We’d love to hear from you. Questions, feedback, or a custom project—let’s talk.
            </p>
          </div>
        </div>
      </section>

      {/* =============== Main Content =============== */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Cards */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-800">Get in Touch</h2>
              <p className="mt-2 text-sm text-slate-600">
                Our team at <span className="font-semibold">Masha Industries</span> is here to help. Reach out via
                email or phone, or send us a message using the form.
              </p>

              <div className="mt-5 space-y-4">
                <a
                  href="mailto:support@mashaindustries.com"
                  className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-white hover:ring-red-200 transition"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <LuMail />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Email</p>
                    <p className="text-sm text-slate-600">support@mashaindustries.com</p>
                  </div>
                </a>

                <a
                  href="tel:+1-555-0134"
                  className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-white hover:ring-red-200 transition"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <LuPhone />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Phone</p>
                    <p className="text-sm text-slate-600">+1 (555) 0134</p>
                  </div>
                </a>

                <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <LuMapPin />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Address</p>
                    <p className="text-sm text-slate-600">
                      123 Creative Way, Suite 402<br />Karachi, PK 74000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <LuClock />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Support Hours</p>
                    <p className="text-sm text-slate-600">Mon–Fri, 9:00 AM – 6:00 PM (PKT)</p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-800">Follow Us</p>
                <div className="mt-3 flex gap-3">
                  {[{Icon:LuFacebook, href:"https://facebook.com"},
                    {Icon:LuInstagram, href:"https://instagram.com"},
                    {Icon:LuTwitter, href:"https://twitter.com"},
                    {Icon:LuLinkedin, href:"https://linkedin.com"}].map(({Icon, href}) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 text-slate-500 hover:text-red-600 hover:ring-red-200 transition"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map / Image placeholder */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
              <div
                className="h-56 w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop")',
                }}
                aria-label="Map placeholder"
              />
              <div className="p-4 text-xs text-slate-600">
                Looking for us? We ship worldwide from our Karachi studio. This is a placeholder—swap in your map/iframe when ready.
              </div>
            </div>
          </aside>

          {/* Right: Contact Form */}
          <main className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-slate-800">Send Us a Message</h2>
              <p className="mt-2 text-sm text-slate-600">
                Tell us a bit about your project or question. We typically reply within one business day.
              </p>

              {/* Status */}
              {status.message && (
                <div
                  className={`mt-4 rounded-lg border p-3 text-sm ${
                    status.type === "success"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div className="md:col-span-1">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    placeholder="+1 555 0134"
                  />
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                    Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    placeholder="Tell us about your idea, order, or question..."
                    required
                  />
                </div>

                <div className="md:col-span-2 flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    By submitting, you agree to our{" "}
                    <a href="/privacy" className="underline hover:text-red-600">
                      Privacy Policy
                    </a>
                    .
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2.5 text-white text-sm font-medium hover:bg-red-700 transition"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Quick CTA */}
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-red-600 via-red-600/90 to-red-700 p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Have a custom design in mind?</h3>
                  <p className="text-white/90 text-sm">Jump straight into our custom order flow.</p>
                </div>
                <Link
                  to="/custom"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-red-600 font-semibold hover:bg-white/90 transition"
                >
                  Create a Custom Order
                </Link>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* =============== FAQ (optional, simple) =============== */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-slate-800">FAQs</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: "How long does production take?",
                a: "Most custom orders ship within 5–7 business days after approval.",
              },
              {
                q: "Can I use the AI Image Generator for free?",
                a: "Yes—generate concepts at no cost, then choose what you’d like to print.",
              },
              {
                q: "Do you offer bulk pricing?",
                a: "We do. Contact us with your quantities and we’ll prepare a tailored quote.",
              },
              {
                q: "What file types do you accept for uploads?",
                a: "PNG, JPG, SVG, and PDF are preferred. High-resolution files yield the best results.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-xl border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer list-none font-medium text-slate-800 flex items-center justify-between">
                  <span>{q}</span>
                  <span className="ml-2 text-slate-400 group-open:rotate-180 transition">⌄</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
