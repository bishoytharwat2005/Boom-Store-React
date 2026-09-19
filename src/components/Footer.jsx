import React from "react";

import {
  Store,
  // Github,
  // Instagram,
  // Facebook,  
  Home,
  Info,
  ShoppingBag,
  Heart,
  ShoppingCart,
} from "lucide-react";

import { Link } from "react-router";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
          <div className="sm:col-span-2">
            <Link
              to="/"
              className="group inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-950/30 transition duration-300 group-hover:scale-105 group-hover:bg-violet-500">
                <Store size={22} />
              </div>

              <div className="leading-none">
                <p className="text-2xl font-extrabold tracking-tight">
                  Shop
                  <span className="text-violet-400">
                    Store
                  </span>
                </p>

                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                  Simple Shopping
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-md leading-7 text-slate-400">
              Discover amazing products with a simple,
              modern, and enjoyable shopping experience.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-violet-500"
              >
                <ShoppingBag size={17} />
                Explore Products
              </Link>

              <Link
                to="/favorites"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-400"
              >
                <Heart size={17} />
                Favorites
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-400">
              <Link
                to="/"
                className="flex items-center gap-2 transition hover:translate-x-1 hover:text-violet-400"
              >
                <Home size={16} />
                Home
              </Link>

              <Link
                to="/about"
                className="flex items-center gap-2 transition hover:translate-x-1 hover:text-violet-400"
              >
                <Info size={16} />
                About
              </Link>

              <Link
                to="/products"
                className="flex items-center gap-2 transition hover:translate-x-1 hover:text-violet-400"
              >
                <ShoppingBag size={16} />
                Products
              </Link>

              <Link
                to="/favorites"
                className="flex items-center gap-2 transition hover:translate-x-1 hover:text-violet-400"
              >
                <Heart size={16} />
                Favorites
              </Link>

              <Link
                to="/cart"
                className="flex items-center gap-2 transition hover:translate-x-1 hover:text-violet-400"
              >
                <ShoppingCart size={16} />
                Cart
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Follow Us
            </h3>

            <p className="mb-5 max-w-xs text-sm leading-6 text-slate-400">
              Follow ShopStore and stay updated with our
              latest products and updates.
            </p>

            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:-translate-y-1 hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-400"
              >
                {/* <Github size={18} /> */}
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:-translate-y-1 hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-400"
              >
                {/* <Instagram size={18} /> */}
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:-translate-y-1 hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-400"
              >
                {/* <Facebook size={18} /> */}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-800 py-6 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {currentYear} ShopStore. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-4 sm:justify-end">
            <Link
              to="/products"
              className="transition hover:text-slate-300"
            >
              Products
            </Link>

            <Link
              to="/about"
              className="transition hover:text-slate-300"
            >
              About
            </Link>

            <Link
              to="/cart"
              className="transition hover:text-slate-300"
            >
              Cart
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
