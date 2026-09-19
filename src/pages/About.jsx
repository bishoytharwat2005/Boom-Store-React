import React from "react";

import {
  ShoppingBag,
  ShieldCheck,
  Heart,
  Users,
  Target,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Truck,
} from "lucide-react";

import { Link } from "react-router";

function About() {
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We focus on creating a comfortable and enjoyable shopping experience.",
      iconClass: "bg-violet-100 text-violet-600",
    },
    {
      icon: ShieldCheck,
      title: "Security",
      description:
        "Your shopping experience should feel safe, reliable, and trustworthy.",
      iconClass: "bg-green-100 text-green-600",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "We build simple experiences around the needs of our customers.",
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      icon: Target,
      title: "Simplicity",
      description:
        "Everything is designed to be clear, intuitive, and easy to use.",
      iconClass: "bg-yellow-100 text-yellow-600",
    },
  ];

  const features = [
    "Easy product discovery",
    "Simple cart management",
    "Save your favorite products",
    "Clean and responsive design",
  ];

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24 lg:py-28">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/10" />

        <div className="container relative mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300">
              <Sparkles size={16} />
              About ShopStore
            </div>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Shopping Made
              <span className="block text-violet-400">
                Simple
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              ShopStore is a modern e-commerce experience
              built to make discovering, saving, and
              shopping for products simple, fast, and
              enjoyable.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/products"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:bg-violet-700"
              >
                Explore Products
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/favorites"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 px-7 text-sm font-bold text-slate-200 transition hover:border-violet-500 hover:bg-violet-500/10 hover:text-white"
              >
                <Heart size={18} />
                View Favorites
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">
                Who We Are
              </p>

              <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                Built For A Better Shopping Experience
              </h2>

              <p className="mt-6 max-w-xl leading-8 text-slate-600">
                We believe online shopping should be
                simple and enjoyable. ShopStore brings
                products together in a clean and
                easy-to-use platform where customers can
                explore products, save favorites, and
                manage their cart with ease.
              </p>

              <p className="mt-5 max-w-xl leading-8 text-slate-600">
                Our goal is to create a smooth experience
                from the first product you discover until
                you complete your shopping journey.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                      <CheckCircle size={17} />
                    </div>

                    <span className="text-sm font-semibold text-slate-700">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-violet-100/70 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <div className="flex h-[360px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-white shadow-sm sm:h-[420px]">
                  <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-violet-50">
                    <div className="absolute inset-8 rounded-full border border-violet-200" />

                    <div className="flex h-36 w-36 items-center justify-center rounded-[2rem] bg-violet-600 text-white shadow-2xl shadow-violet-200">
                      <ShoppingBag
                        size={76}
                        strokeWidth={1.2}
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 flex items-center gap-3 rounded-2xl border border-white/50 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Safe Shopping
                    </p>

                    <p className="text-xs text-slate-500">
                      Simple & Reliable
                    </p>
                  </div>
                </div>

                <div className="absolute right-8 top-8 flex items-center gap-3 rounded-2xl border border-white/50 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                    <Truck size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Easy Shopping
                    </p>

                    <p className="text-xs text-slate-500">
                      Fast & Simple
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">
              Our Values
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              What We Focus On
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              Everything we build is focused on making
              online shopping easier and more enjoyable.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition duration-300 group-hover:scale-105 ${value.iconClass}`}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {value.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-500">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-center text-white sm:px-10 lg:px-16 lg:py-14">
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-violet-600/20 blur-3xl" />

            <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 shadow-lg shadow-violet-950/30">
                <ShoppingBag size={25} />
              </div>

              <h2 className="mt-6 text-3xl font-black sm:text-4xl">
                Ready To Start Shopping?
              </h2>

              <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
                Explore our products and discover
                something you’ll love.
              </p>

              <Link
                to="/products"
                className="mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-violet-50"
              >
                Start Shopping
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;