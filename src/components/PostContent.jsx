import React, { useMemo, useState } from "react";

import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { Button } from "./ui/button";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";

function PostContent() {
  const {
    products,
    loading,
    error,
    refetch,
  } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      products.map((product) => product.category)
    );

    return ["all", ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const searchValue = search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter((product) =>
        product.title
          ?.toLowerCase()
          .includes(searchValue)
      );
    }

    if (category !== "all") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (sort === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    if (sort === "rating") {
      result.sort(
        (a, b) =>
          (b.rating?.rate || 0) -
          (a.rating?.rate || 0)
      );
    }

    return result;
  }, [products, search, category, sort]);

  function resetFilters() {
    setSearch("");
    setCategory("all");
    setSort("default");
  }

  function scrollToProducts() {
    document
      .getElementById("products")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  if (loading) {
    return (
      <div className="bg-gray-50">
        <section className="bg-slate-950 px-4 py-20 sm:px-6">
          <div className="container mx-auto">
            <div className="h-12 w-3/4 animate-pulse rounded-xl bg-slate-800" />

            <div className="mt-5 h-6 w-1/2 animate-pulse rounded-xl bg-slate-800" />
          </div>
        </section>

        <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-10 sm:px-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-[500px] animate-pulse rounded-2xl bg-gray-200"
              />
            )
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[600px] flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <RotateCcw size={26} />
        </div>

        <h2 className="text-2xl font-bold text-slate-900">
          Something went wrong
        </h2>

        <p className="max-w-md text-gray-500">
          {error}
        </p>

        <Button
          type="button"
          onClick={refetch}
          className="gap-2 bg-violet-600 hover:bg-violet-700"
        >
          <RotateCcw size={17} />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
                <Sparkles size={16} />
                New Collection Available
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Discover Products
                <span className="block text-violet-400">
                  You’ll Love
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                Explore our collection of quality
                products, find your favorites, and enjoy a
                simple shopping experience.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  size="lg"
                  onClick={scrollToProducts}
                  className="h-12 gap-2 bg-violet-600 px-7 text-base shadow-lg shadow-violet-950/30 hover:bg-violet-700"
                >
                  Shop Now
                  <ArrowRight size={19} />
                </Button>

                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    setCategory("all");
                    setSearch("");
                    scrollToProducts();
                  }}
                  className="h-12 border-slate-700 bg-transparent px-7 text-base text-white hover:bg-white hover:text-slate-950"
                >
                  Explore Products
                </Button>
              </div>

              <div className="mt-10 grid max-w-lg grid-cols-3 gap-5 border-t border-slate-800 pt-7">
                <div>
                  <p className="text-2xl font-bold">
                    {products.length}+
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Products
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    4.8
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Average Rating
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    24/7
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Support
                  </p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative mx-auto flex h-[450px] w-[450px] items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-violet-400/10" />

                <div className="absolute inset-8 rounded-full border border-violet-400/10" />

                <div className="absolute inset-16 rounded-full bg-violet-600/10 blur-2xl" />

                <div className="relative flex h-72 w-72 rotate-3 items-center justify-center rounded-[3rem] border border-white/10 bg-gradient-to-br from-violet-500 to-indigo-600 shadow-2xl shadow-violet-950/50">
                  <ShoppingBag
                    size={130}
                    strokeWidth={1.2}
                    className="text-white"
                  />
                </div>

                <div className="absolute right-0 top-14 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20">
                    <Truck
                      size={20}
                      className="text-green-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Fast Delivery
                    </p>

                    <p className="text-xs text-slate-400">
                      Quick & Reliable
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-12 left-0 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20">
                    <ShieldCheck
                      size={20}
                      className="text-violet-300"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Secure Shopping
                    </p>

                    <p className="text-xs text-slate-400">
                      Safe & Trusted
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="products"
        className="py-16 lg:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-violet-600">
              <span className="h-2 w-2 rounded-full bg-violet-600" />
              Our Collection
            </div>

            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Explore Our Products
            </h2>

            <p className="mt-3 max-w-2xl text-gray-500">
              Discover our latest products and find
              something perfect for you.
            </p>
          </div>

          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row">
              <div className="relative min-w-0 flex-1">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-2 sm:flex-none">
                  <SlidersHorizontal
                    size={20}
                    className="shrink-0 text-gray-500"
                  />

                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    aria-label="Filter by category"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-500 sm:w-auto"
                  >
                    {categories.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item === "all"
                          ? "All Categories"
                          : item}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                  aria-label="Sort products"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-500 sm:w-auto"
                >
                  <option value="default">
                    Sort By
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="rating">
                    Highest Rating
                  </option>
                </select>

                <Button
                  type="button"
                  variant="outline"
                  onClick={resetFilters}
                  className="gap-2 border-slate-200"
                >
                  <RotateCcw size={17} />
                  Reset
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {filteredProducts.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900">
                {products.length}
              </span>{" "}
              products
            </p>

            {(search ||
              category !== "all" ||
              sort !== "default") && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-sm font-semibold text-violet-600 transition hover:text-violet-700"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <Search size={27} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                No Products Found
              </h2>

              <p className="mt-2 max-w-md text-gray-500">
                We couldn’t find any products matching
                your current search or filters.
              </p>

              <Button
                type="button"
                onClick={resetFilters}
                className="mt-5 gap-2 bg-violet-600 hover:bg-violet-700"
              >
                <RotateCcw size={17} />
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default PostContent;