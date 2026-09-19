import React, { useEffect, useState } from "react";

import {
  Heart,
  ShoppingCart,
  Check,
  ArrowRight,
  ImageOff,
} from "lucide-react";

import { Link } from "react-router";

import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const {
    addToCart,
    toggleFavorite,
    isFavorite,
  } = useCart();

  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const favorite = isFavorite(product?.id);

  useEffect(() => {
    return () => {
      setAdded(false);
    };
  }, []);

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);
    setAdded(true);

    const timer = setTimeout(() => {
      setAdded(false);
    }, 1500);

    return () => clearTimeout(timer);
  }

  function handleFavorite(e) {
    e.preventDefault();
    e.stopPropagation();

    toggleFavorite(product);
  }

  const price = Number(product?.price || 0);
  const rating = Number(product?.rating?.rate || 0);

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-slate-50 p-6 sm:h-72">
        {!imageError && product?.image ? (
          <img
            src={product.image}
            alt={product.title || "Product"}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
            <ImageOff size={42} strokeWidth={1.5} />

            <span className="text-sm font-medium">
              Image unavailable
            </span>
          </div>
        )}

        <button
          type="button"
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          onClick={handleFavorite}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition ${
            favorite
              ? "border-red-100 bg-red-50 text-red-500"
              : "border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
          }`}
        >
          <Heart
            size={19}
            fill={favorite ? "currentColor" : "none"}
          />
        </button>

        {added && (
          <div className="absolute inset-x-5 bottom-5 flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-green-900/20">
            <Check size={17} />
            Added to Cart
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="truncate text-xs font-semibold uppercase tracking-wider text-violet-600">
          {product?.category || "Product"}
        </p>

        <h3 className="mt-2 line-clamp-2 min-h-14 text-lg font-bold leading-7 text-slate-900 transition group-hover:text-violet-600">
          {product?.title || "Untitled Product"}
        </h3>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xl font-extrabold text-green-600">
            ${price.toFixed(2)}
          </span>

          {product?.rating && (
            <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-sm font-bold text-amber-500">
              <span>★</span>
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl font-bold transition duration-300 ${
            added
              ? "bg-green-600 text-white shadow-lg shadow-green-900/10"
              : "bg-violet-600 text-white hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200"
          }`}
        >
          {added ? (
            <>
              <Check size={18} />
              Added
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              Add to Cart
            </>
          )}
        </button>

        <div className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-400 transition group-hover:text-violet-500">
          View Details

          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
