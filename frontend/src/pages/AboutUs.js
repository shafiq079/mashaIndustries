import React from "react";
import { Link } from "react-router-dom";
import {
  LuLightbulb,
  LuShirt,
  LuRocket,
  LuSparkles,
  LuCheckCircle2,
  LuUsers,
} from "react-icons/lu";

const AboutUs = () => {
  return (
    <div className="bg-white text-slate-700">
      {/* ===================== Hero ===================== */}
      <section className="relative">
        <div
          className="h-[46vh] sm:h-[56vh] lg:h-[64vh] w-full bg-center bg-cover"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1920&auto=format&fit=crop")',
          }}
          aria-label="Modern design studio background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Wear Your Imagination.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/90">
                At <span className="font-semibold">Masha Industries</span>, we
                merge technology with textiles to bring your vision to life.
              </p>
              <div className="mt-8">
                <Link
                  to="/custom"
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-white font-medium hover:bg-red-700 transition"
                >
                  Create a Custom Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Our Story ===================== */}
      <section className="py-14 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                From a Spark of an Idea to a Revolution in Apparel.
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Masha Industries was founded on a simple belief: everyone should
                be able to create and wear truly custom clothing—without
                compromise. What began as a spark has grown into a platform
                where creativity meets craftsmanship. From individuals crafting a
                one-of-a-kind tee to businesses outfitting entire teams, we’re
                making high-quality customization accessible, intuitive, and
                joyful. Our mission is to empower your imagination with tools
                that feel effortless—and results that feel premium.
              </p>
            </div>

            {/* Visual */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1920&auto=format&fit=crop"
                alt="Custom apparel workspace"
                className="h-64 sm:h-80 lg:h-96 w-full rounded-2xl object-cover ring-1 ring-slate-200 shadow-sm bg-slate-100"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22640%22 height=%22480%22><rect width=%22640%22 height=%22480%22 fill=%22%23f1f5f9%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%2394a3b8%22 font-family=%22Arial, Helvetica, sans-serif%22 font-size=%2220%22>Image unavailable</text></svg>';
                }}
              />
              {/* Overlay badge WITH image */}
              <div className="absolute -bottom-4 left-4 rounded-xl bg-white shadow p-3 ring-1 ring-slate-200 hidden sm:flex items-center gap-3">
                
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Built on Creativity
                  </p>
                  <p className="text-sm font-semibold text-slate-800">
                    Uploads • AI Image Generator • Virtual Try-On
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Our Process ===================== */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Your Vision, Our Process.
            </h3>
            <p className="mt-3 text-slate-600">
              A simple, guided flow that turns ideas into wearable art.
            </p>
          </header>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-sm transition">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <LuLightbulb className="text-xl" aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold tracking-wide text-slate-500">
                  Step 1
                </p>
              </div>
              <h4 className="mt-4 text-lg font-semibold text-slate-800">
                Design
              </h4>
              <p className="mt-2 text-slate-600">
                Bring your idea. Upload your finished artwork or create something
                entirely new with our powerful AI Image Generator.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-sm transition">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <LuShirt className="text-xl" aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold tracking-wide text-slate-500">
                  Step 2
                </p>
              </div>
              <h4 className="mt-4 text-lg font-semibold text-slate-800">
                Customize
              </h4>
              <p className="mt-2 text-slate-600">
                Choose your canvas. Select from our curated collection of
                high-quality apparel, and pick your size, color, and material.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-sm transition">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <LuRocket className="text-xl" aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold tracking-wide text-slate-500">
                  Step 3
                </p>
              </div>
              <h4 className="mt-4 text-lg font-semibold text-slate-800">
                Order
              </h4>
              <p className="mt-2 text-slate-600">
                We’ll handle the rest. Our state-of-the-art printing process
                ensures a flawless final product, delivered right to your door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Our Commitment ===================== */}
      <section className="py-14 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Innovation, Quality, and You.
            </h3>
          </header>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <LuSparkles aria-hidden="true" />
                </span>
                <h4 className="text-lg font-semibold text-slate-800">Innovation</h4>
              </div>
              <p className="mt-3 text-slate-600">
                We are constantly exploring new frontiers—from AI-powered design
                tools to virtual try-on technology—to give you an unparalleled
                creative experience.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <LuCheckCircle2 aria-hidden="true" />
                </span>
                <h4 className="text-lg font-semibold text-slate-800">Quality</h4>
              </div>
              <p className="mt-3 text-slate-600">
                We obsess over the details. From premium, ethically sourced
                materials to vibrant, durable prints, we guarantee a product
                you’ll love to wear.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <LuUsers aria-hidden="true" />
                </span>
                <h4 className="text-lg font-semibold text-slate-800">Collaboration</h4>
              </div>
              <p className="mt-3 text-slate-600">
                You are at the heart of our process. We’re dedicated to
                providing the support and tools you need to turn your creative
                spark into wearable art.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-r from-red-600 via-red-600/90 to-red-700" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold ">
            Ready to Create Something Unique?
          </h3>
          <p className="mt-3 ">
            Start from your idea or explore new ones with our AI Image
            Generator—then make it yours.
          </p>
          <div className="mt-8">
            <Link
              to="/custom"
              className="inline-flex items-center justify-center rounded-full bg-red-50 px-6 py-3 text-red-700 font-semibold hover:bg-white transition shadow-sm"
            >
              Create a Custom Order
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
