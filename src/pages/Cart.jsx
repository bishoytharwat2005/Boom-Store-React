import React, { useMemo, useState } from "react";

import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ImageOff,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const [imageErrors, setImageErrors] = useState({});

  const itemCount = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );
  }, [cart]);

  function handleImageError(productId) {
    setImageErrors((current) => ({
      ...current,
      [productId]: true,
    }));
  }

  function handleDecrease(item) {
    if (Number(item.quantity) <= 1) {
      removeFromCart(item.id);
      return;
    }

    decreaseQuantity(item.id);
  }

  if (!cart || cart.length === 0) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-16 sm:px-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-violet-100">
            <ShoppingBag
              size={42}
              className="text-violet-600"
            />
          </div>

          <h1 className="mt-7 text-3xl font-black text-slate-900 sm:text-4xl">
            Your Cart Is Empty
          </h1>

          <p className="mx-auto mt-3 max-w-sm leading-7 text-slate-500">
            You haven't added any products to your cart
            yet. Explore our collection and find something
            you love.
          </p>

          <Button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-7 h-12 gap-2 rounded-xl bg-violet-600 px-6 font-bold shadow-lg shadow-violet-200 hover:bg-violet-700"
          >
            Start Shopping
            <ArrowRight size={18} />
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-10 sm:py-12 lg:py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">
              Shopping Cart
            </p>

            <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
              Your Cart
            </h1>

            <p className="mt-3 text-slate-500">
              Review your products before checkout.
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="inline-flex w-fit items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-red-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={17} />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => {
              const price = Number(item.price || 0);
              const quantity = Number(
                item.quantity || 0
              );

              const itemTotal = price * quantity;

              return (
                <article
                  key={item.id}
                  className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <Link
                      to={`/products/${item.id}`}
                      className="group flex h-44 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-5 sm:h-36 sm:w-36"
                    >
                      {imageErrors[item.id] ||
                      !item.image ? (
                        <div className="flex flex-col items-center gap-2 text-slate-400">
                          <ImageOff size={32} />
                          <span className="text-xs">
                            No image
                          </span>
                        </div>
                      ) : (
                        <img
                          src={item.image}
                          alt={item.title || "Product"}
                          onError={() =>
                            handleImageError(item.id)
                          }
                          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                        />
                      )}
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <Link
                          to={`/products/${item.id}`}
                          className="group"
                        >
                          <h2 className="line-clamp-2 text-lg font-bold leading-7 text-slate-900 transition group-hover:text-violet-600">
                            {item.title ||
                              "Untitled Product"}
                          </h2>
                        </Link>

                        <p className="mt-2 text-sm capitalize text-slate-500">
                          {item.category || "Product"}
                        </p>

                        <p className="mt-2 text-sm font-semibold text-green-600">
                          ${price.toFixed(2)} each
                        </p>
                      </div>

                      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-fit items-center overflow-hidden rounded-xl border border-slate-200">
                          <button
                            type="button"
                            onClick={() =>
                              handleDecrease(item)
                            }
                            aria-label={`Decrease quantity of ${
                              item.title || "product"
                            }`}
                            className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-slate-100 hover:text-violet-600"
                          >
                            <Minus size={16} />
                          </button>

                          <span
                            aria-label={`Quantity: ${quantity}`}
                            className="flex h-10 min-w-12 items-center justify-center border-x border-slate-200 px-3 text-sm font-bold text-slate-900"
                          >
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            aria-label={`Increase quantity of ${
                              item.title || "product"
                            }`}
                            className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-slate-100 hover:text-violet-600"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-4 sm:justify-end">
                          <span className="text-xl font-black text-green-600">
                            ${itemTotal.toFixed(2)}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                            aria-label={`Remove ${
                              item.title || "product"
                            } from cart`}
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            <Link
              to="/products"
              className="inline-flex items-center gap-2 pt-3 font-bold text-slate-600 transition hover:text-violet-600"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <h2 className="text-2xl font-black text-slate-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Items</span>

                  <span className="font-semibold text-slate-900">
                    {itemCount}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal</span>

                  <span className="font-semibold text-slate-900">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Shipping</span>

                  <span className="font-bold text-green-600">
                    Free
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-slate-900">
                      Total
                    </span>

                    <span className="text-2xl font-black text-violet-600">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-7 h-14 w-full gap-2 rounded-2xl bg-violet-600 text-base font-bold shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
              >
                Proceed To Checkout
                <ArrowRight size={20} />
              </Button>

              <div className="mt-4 rounded-xl bg-green-50 p-4 text-center text-sm font-semibold text-green-700">
                Secure checkout • Free shipping
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Cart;