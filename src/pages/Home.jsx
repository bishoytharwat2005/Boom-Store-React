import React from "react";

import {
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Star,
  Sparkles,
  Heart,
  ShoppingCart,
} from "lucide-react";

import { Link } from "react-router";

function Home() {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On all orders",
      iconClass: "bg-violet-100 text-violet-600",
    },
    {
      icon: ShieldCheck,
      title: "Secure Shopping",
      description: "Safe and trusted",
      iconClass: "bg-green-100 text-green-600",
    },
    {
      icon: Star,
      title: "Quality Products",
      description: "Carefully selected",
      iconClass: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="container relative mx-auto px-4 sm:px-6">
          <div className="grid min-h-[680px] items-center gap-14 py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300">
                <Sparkles size={16} />
                Welcome to ShopStore
              </span>

              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                Everything You Need,
                <span className="block text-violet-400">
                  All In One Place.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
                Discover quality products, great prices,
                and a simple shopping experience designed
                to make every purchase easier.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/products"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 font-bold shadow-lg shadow-violet-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-violet-950/50"
                >
                  Shop Now
                  <ArrowRight size={19} />
                </Link>

                <Link
                  to="/about"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-700 px-7 font-bold text-slate-200 transition duration-300 hover:border-slate-600 hover:bg-slate-900"
                >
                  Learn More
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-5 border-t border-slate-800 pt-7">
                <div>
                  <p className="text-2xl font-extrabold sm:text-3xl">
                    100+
                  </p>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Products
                  </p>
                </div>

                <div className="border-x border-slate-800 px-4">
                  <div className="flex items-center gap-1">
                    <p className="text-2xl font-extrabold sm:text-3xl">
                      4.8
                    </p>

                    <Star
                      size={17}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  </div>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Customer Rating
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-extrabold sm:text-3xl">
                    24/7
                  </p>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Support
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -right-8 -top-8 h-56 w-56 rounded-full bg-violet-600/20 blur-3xl" />

              <div className="absolute -bottom-10 -left-8 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

              <div className="relative rounded-[2rem] border border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-black/30 sm:p-8">
                <div className="relative flex h-[360px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/20 via-slate-900 to-slate-950">
                  <div className="absolute inset-8 rounded-full border border-violet-400/10" />

                  <div className="absolute inset-16 rounded-full border border-violet-400/10" />

                  <div className="relative flex h-56 w-56 items-center justify-center rounded-[2.5rem] border border-violet-400/20 bg-violet-500/10 shadow-2xl shadow-violet-950/40">
                    <ShoppingBag
                      size={145}
                      strokeWidth={1}
                      className="text-violet-400"
                    />
                  </div>

                  <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                    <Heart
                      size={19}
                      className="text-violet-300"
                      fill="currentColor"
                    />
                  </div>

                  <div className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                    <ShoppingCart
                      size={19}
                      className="text-violet-300"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold">
                      Premium Shopping
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Simple. Fast. Modern.
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1 rounded-xl bg-white/5 px-3 py-2">
                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="text-sm font-bold">
                      4.8
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-8">
        <div className="container mx-auto grid grid-cols-1 gap-3 px-4 sm:grid-cols-3 sm:px-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group flex items-center gap-4 rounded-2xl p-5 transition duration-300 hover:bg-gray-50"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition duration-300 group-hover:scale-105 ${feature.iconClass}`}
                >
                  <Icon size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
              Start Shopping
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Find Something You Love
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">
              Explore our collection and discover products
              that fit your style, needs, and everyday life.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
            <Link
              to="/products"
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition group-hover:scale-105">
                <ShoppingBag size={21} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Explore Products
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Browse our complete collection and discover
                something new.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-violet-600">
                Shop Now
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </Link>

            <Link
              to="/favorites"
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500 transition group-hover:scale-105">
                <Heart
                  size={21}
                  fill="currentColor"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Save Favorites
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Keep the products you love saved for later.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-red-500">
                View Favorites
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </Link>

            <Link
              to="/cart"
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:scale-105">
                <ShoppingCart size={21} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Ready to Checkout
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Review your selected products and complete
                your order.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-600">
                View Cart
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 font-bold text-white shadow-lg shadow-violet-200 transition duration-300 hover:-translate-y-0.5 hover:bg-violet-700"
            >
              Explore All Products
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;