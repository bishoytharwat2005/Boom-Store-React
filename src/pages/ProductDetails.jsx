import React, { useEffect, useRef, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Check,
  Star,
  ShieldCheck,
  Truck,
  ImageOff,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router";

import { Button } from "../components/ui/button";

import { useCart } from "../context/CartContext";

import useProducts from "../hooks/useProducts";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    products,
    loading,
    error,
  } = useProducts();

  const {
    addToCart,
    updateQuantity,
    toggleFavorite,
    isFavorite,
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const timerRef = useRef(null);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    setQuantity(1);
    setAdded(false);
    setImageError(false);
  }, [id]);

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  function decreaseQuantity() {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  }

  function handleAddToCart() {
    if (!product) {
      return;
    }

    addToCart(product);

    if (quantity > 1) {
      updateQuantity(product.id, quantity);
    }

    setAdded(true);

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  function handleFavorite() {
    if (!product) {
      return;
    }

    toggleFavorite(product);
  }

  function handleCheckout() {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: "/checkout",
        },
      });

      return;
    }

    navigate("/checkout");
  }

  if (loading) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-16 sm:px-6">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

          <p className="mt-4 font-semibold text-slate-600">
            Loading product...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-16 sm:px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
            <ImageOff size={34} />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Something Went Wrong
          </h1>

          <p className="mt-3 leading-7 text-gray-500">
            {error}
          </p>

          <Button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-6 gap-2 rounded-xl bg-violet-600 px-6 hover:bg-violet-700"
          >
            <ArrowLeft size={18} />
            Back To Products
          </Button>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-16 sm:px-6">
        <div className="text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 text-violet-600">
            <ShoppingCart size={40} />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Product Not Found
          </h1>

          <p className="mx-auto mt-3 max-w-md leading-7 text-gray-500">
            The product you are looking for does not
            exist or may have been removed.
          </p>

          <Button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-7 gap-2 rounded-xl bg-violet-600 px-6 hover:bg-violet-700"
          >
            <ArrowLeft size={18} />
            Back To Products
          </Button>
        </div>
      </section>
    );
  }

  const favorite = isFavorite(product.id);

  const rating = Number(
    product.rating?.rate || 0
  );

  const ratingCount = Number(
    product.rating?.count || 0
  );

  const price = Number(product.price || 0);

  const totalPrice = price * quantity;

  return (
    <section className="bg-gray-50 py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <Link
          to="/products"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-violet-600"
        >
          <ArrowLeft size={18} />
          Back To Products
        </Link>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-slate-50 p-8 sm:min-h-[550px] sm:p-12">
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/60 blur-3xl" />

              {imageError || !product.image ? (
                <div className="relative flex flex-col items-center gap-3 text-slate-400">
                  <ImageOff
                    size={50}
                    strokeWidth={1.5}
                  />

                  <span className="text-sm font-medium">
                    Image unavailable
                  </span>
                </div>
              ) : (
                <img
                  src={product.image}
                  alt={product.title || "Product"}
                  onError={() => setImageError(true)}
                  className="relative max-h-[480px] w-full object-contain transition duration-500 hover:scale-105"
                />
              )}

              <button
                type="button"
                aria-label={
                  favorite
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
                aria-pressed={favorite}
                onClick={handleFavorite}
                className={`absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border shadow-sm transition hover:scale-105 ${
                  favorite
                    ? "border-red-100 bg-red-50 text-red-500"
                    : "border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                }`}
              >
                <Heart
                  size={21}
                  fill={
                    favorite
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <span className="inline-flex w-fit max-w-full truncate rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-600">
                {product.category || "Product"}
              </span>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                {product.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star
                      size={18}
                      fill="currentColor"
                    />

                    <span className="font-bold">
                      {rating.toFixed(1)}
                    </span>
                  </div>

                  <span className="text-sm text-gray-400">
                    ({ratingCount} reviews)
                  </span>
                </div>

                <div className="hidden h-5 w-px bg-slate-200 sm:block" />

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600">
                  <Check size={16} />
                  In Stock
                </span>
              </div>

              <div className="mt-7">
                <span className="text-4xl font-extrabold text-violet-600">
                  ${price.toFixed(2)}
                </span>
              </div>

              <p className="mt-6 leading-8 text-gray-500">
                {product.description}
              </p>

              <div className="mt-8 border-t border-slate-100 pt-8">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-5 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-500">
                        Quantity
                      </p>

                      <div className="mt-2 flex h-12 w-fit items-center rounded-xl border border-slate-200 bg-white">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={decreaseQuantity}
                          disabled={quantity <= 1}
                          className="flex h-12 w-12 items-center justify-center rounded-l-xl text-slate-600 transition hover:bg-slate-100 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600"
                        >
                          <Minus size={18} />
                        </button>

                        <span
                          aria-label={`Quantity: ${quantity}`}
                          className="flex h-12 min-w-14 items-center justify-center border-x border-slate-200 px-4 text-sm font-bold text-slate-900"
                        >
                          {quantity}
                        </span>

                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={increaseQuantity}
                          className="flex h-12 w-12 items-center justify-center rounded-r-xl text-slate-600 transition hover:bg-slate-100 hover:text-violet-600"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-sm font-semibold text-gray-500">
                        Total Price
                      </p>

                      <p className="mt-1 text-3xl font-extrabold text-violet-600">
                        ${totalPrice.toFixed(2)}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        ${price.toFixed(2)} × {quantity}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={handleAddToCart}
                    className={`h-12 w-full gap-2 rounded-xl text-base font-bold transition ${
                      added
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-violet-600 hover:bg-violet-700"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check size={20} />
                        Added To Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} />
                        Add To Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {added && (
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
                  >
                    View Cart
                    <ArrowRight size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-700"
                  >
                    Checkout
                    <ArrowRight size={17} />
                  </button>
                </div>
              )}

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <Truck
                    size={20}
                    className="text-violet-600"
                  />

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    Free Shipping
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Fast delivery
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <ShieldCheck
                    size={20}
                    className="text-green-600"
                  />

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    Secure Payment
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Safe checkout
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <ShoppingCart
                    size={20}
                    className="text-violet-600"
                  />

                  <p className="mt-2 text-sm font-bold text-slate-900">
                    Easy Shopping
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Simple experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;