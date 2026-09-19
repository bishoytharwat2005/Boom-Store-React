import React, { useEffect, useRef, useState } from "react";

import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Check,
  ImageOff,
} from "lucide-react";

import { Link, useNavigate } from "react-router";

import { Button } from "../components/ui/button";
import { useCart } from "../context/CartContext";

function Favorites() {
  const {
    favorites,
    toggleFavorite,
    addToCart,
  } = useCart();

  const navigate = useNavigate();

  const [addedProducts, setAddedProducts] = useState(
    {}
  );

  const timersRef = useRef({});

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(
        (timer) => clearTimeout(timer)
      );
    };
  }, []);

  function handleAddToCart(product) {
    addToCart(product);

    setAddedProducts((prev) => ({
      ...prev,
      [product.id]: true,
    }));

    clearTimeout(timersRef.current[product.id]);

    timersRef.current[product.id] = setTimeout(() => {
      setAddedProducts((prev) => ({
        ...prev,
        [product.id]: false,
      }));
    }, 1500);
  }

  function handleRemoveFavorite(product) {
    toggleFavorite(product);
  }

  if (!favorites || favorites.length === 0) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-6 py-16">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
            <Heart
              size={42}
              className="text-red-500"
              fill="currentColor"
            />
          </div>

          <h1 className="mt-7 text-3xl font-bold text-slate-900">
            No Favorites Yet
          </h1>

          <p className="mt-3 leading-7 text-gray-500">
            Save products you love and find them here
            anytime.
          </p>

          <Button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-7 h-12 rounded-xl bg-violet-600 px-6 hover:bg-violet-700"
          >
            Browse Products
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-red-500">
              Saved Products
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              My Favorites
            </h1>

            <p className="mt-3 text-gray-500">
              Products you've saved for later.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
            <Heart
              size={16}
              className="text-red-500"
              fill="currentColor"
            />

            {favorites.length}{" "}
            {favorites.length === 1
              ? "Product"
              : "Products"}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((product) => {
            const price = Number(product?.price || 0);
            const isAdded = Boolean(
              addedProducts[product?.id]
            );

            return (
              <article
                key={product?.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-slate-50 p-7">
                  {product?.image ? (
                    <img
                      src={product.image}
                      alt={product.title || "Product"}
                      loading="lazy"
                      className="h-52 w-full object-contain transition duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-slate-400">
                      <ImageOff
                        size={40}
                        strokeWidth={1.5}
                      />

                      <span className="text-sm">
                        Image unavailable
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    aria-label="Remove from favorites"
                    onClick={() =>
                      handleRemoveFavorite(product)
                    }
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition hover:scale-110 hover:bg-red-50"
                  >
                    <Heart
                      size={19}
                      fill="currentColor"
                    />
                  </button>

                  <span className="absolute left-4 top-4 max-w-[65%] truncate rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold capitalize text-white">
                    {product?.category || "Product"}
                  </span>
                </div>

                <div className="p-5">
                  <Link
                    to={`/products/${product?.id}`}
                    className="block"
                  >
                    <h2 className="line-clamp-2 min-h-14 text-lg font-bold leading-7 text-slate-900 transition hover:text-violet-600">
                      {product?.title ||
                        "Untitled Product"}
                    </h2>
                  </Link>

                  <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-gray-500">
                    {product?.description ||
                      "No description available."}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-2xl font-extrabold text-green-600">
                      ${price.toFixed(2)}
                    </span>

                    <button
                      type="button"
                      aria-label="Remove product from favorites"
                      onClick={() =>
                        handleRemoveFavorite(product)
                      }
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <Button
                    type="button"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                    className={`mt-4 h-11 w-full gap-2 rounded-xl font-bold transition ${
                      isAdded
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-violet-600 hover:bg-violet-700"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={18} />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        Add To Cart
                      </>
                    )}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <Link
          to="/products"
          className="mt-10 inline-flex items-center gap-2 font-semibold text-gray-600 transition hover:text-violet-600"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}

export default Favorites;