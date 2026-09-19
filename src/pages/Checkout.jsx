import React, { useMemo, useState } from "react";

import {
  CheckCircle,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  User,
  ShoppingBag,
  Truck,
  ArrowLeft,
  ShieldCheck,
  Hash,
} from "lucide-react";

import { Button } from "../components/ui/button";

import { useCart } from "../context/CartContext";

import { Link, useNavigate } from "react-router";

function Checkout() {
  const {
    cart,
    cartTotal,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    payment: "cash",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [orderPlaced, setOrderPlaced] =
    useState(false);

  const [orderId, setOrderId] = useState("");

  const [formError, setFormError] = useState("");

  const shipping = 0;

  const total = cartTotal + shipping;

  const itemCount = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum + Number(item.quantity || 0),
      0
    );
  }, [cart]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formError) {
      setFormError("");
    }
  }

  function validateForm() {
    const phoneRegex = /^[+]?[0-9\s-]{8,15}$/;

    if (!phoneRegex.test(formData.phone.trim())) {
      return "Please enter a valid phone number.";
    }

    if (formData.address.trim().length < 8) {
      return "Please enter a complete shipping address.";
    }

    if (formData.payment === "card") {
      const cardNumber = formData.cardNumber.replace(
        /\s/g,
        ""
      );

      if (!/^\d{16}$/.test(cardNumber)) {
        return "Please enter a valid 16-digit card number.";
      }

      if (!/^\d{2}\/\d{2}$/.test(
        formData.expiryDate
      )) {
        return "Please enter the expiry date as MM/YY.";
      }

      if (!/^\d{3,4}$/.test(formData.cvv)) {
        return "Please enter a valid CVV.";
      }
    }

    return "";
  }

  function generateOrderId() {
    return `ORD-${Date.now()
      .toString()
      .slice(-8)}`;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setFormError(validationError);
      return;
    }

    if (!cart.length) {
      return;
    }

    const newOrderId = generateOrderId();

    const order = {
      id: newOrderId,
      customer: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        address: formData.address.trim(),
      },
      payment:
        formData.payment === "cash"
          ? "Cash on Delivery"
          : "Credit Card",
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: Number(item.price || 0),
        quantity: Number(item.quantity || 0),
        image: item.image,
      })),
      subtotal: Number(cartTotal.toFixed(2)),
      shipping,
      total: Number(total.toFixed(2)),
      createdAt: new Date().toISOString(),
    };

    try {
      const existingOrders = JSON.parse(
        localStorage.getItem("orders") || "[]"
      );

      localStorage.setItem(
        "orders",
        JSON.stringify([
          ...existingOrders,
          order,
        ])
      );
    } catch {
      localStorage.setItem(
        "orders",
        JSON.stringify([order])
      );
    }

    setOrderId(newOrderId);
    setOrderPlaced(true);

    clearCart();
  }

  if (orderPlaced) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-16 sm:px-6">
        <div className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-7 text-center shadow-xl sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle
              size={45}
              className="text-green-600"
            />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-green-600">
            Order Successfully Placed
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            Order Confirmed!
          </h1>

          <p className="mx-auto mt-4 max-w-md leading-7 text-slate-500">
            Thank you for your purchase. Your order has
            been placed successfully.
          </p>

          <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-left">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2 text-slate-500">
                <Hash size={16} />
                <span>Order ID</span>
              </div>

              <span className="font-bold text-slate-900">
                {orderId}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200 py-4">
              <span className="text-slate-500">
                Customer
              </span>

              <span className="max-w-[55%] truncate text-right font-semibold text-slate-900">
                {formData.name}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200 py-4">
              <span className="text-slate-500">
                Payment
              </span>

              <span className="text-right font-semibold text-slate-900">
                {formData.payment === "cash"
                  ? "Cash on Delivery"
                  : "Credit Card"}
              </span>
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="font-semibold text-slate-500">
                Total
              </span>

              <span className="text-xl font-black text-green-600">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-700">
            <ShieldCheck size={18} />
            Your order has been saved successfully.
          </div>

          <Button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-8 h-12 w-full gap-2 rounded-xl bg-violet-600 font-bold hover:bg-violet-700"
          >
            Continue Shopping
            <ArrowLeft
              size={18}
              className="rotate-180"
            />
          </Button>
        </div>
      </section>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-16 sm:px-6">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100">
            <ShoppingBag
              size={38}
              className="text-violet-600"
            />
          </div>

          <h1 className="mt-6 text-3xl font-black text-slate-900">
            Your Cart Is Empty
          </h1>

          <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500">
            Add some products to your cart before
            proceeding to checkout.
          </p>

          <Button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-6 h-12 gap-2 rounded-xl bg-violet-600 px-6 font-bold hover:bg-violet-700"
          >
            Browse Products
            <ShoppingBag size={18} />
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-10 sm:py-12 lg:py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">
            Secure Checkout
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            Complete Your Order
          </h1>

          <p className="mt-3 text-slate-500">
            Enter your information to complete your
            purchase.
          </p>
        </div>

        {formError && (
          <div
            role="alert"
            className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600"
          >
            {formError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 lg:col-span-2"
          >
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100">
                  <User
                    size={21}
                    className="text-violet-600"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Contact Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Your personal information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      autoComplete="name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+20 100 000 0000"
                      autoComplete="tel"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    City
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Cairo"
                      autoComplete="address-level2"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100">
                  <MapPin
                    size={21}
                    className="text-violet-600"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Shipping Address
                  </h2>

                  <p className="text-sm text-slate-500">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <label
                htmlFor="address"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Full Address
              </label>

              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, building number, apartment..."
                autoComplete="street-address"
                required
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-200 p-4 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100">
                  <CreditCard
                    size={21}
                    className="text-violet-600"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Payment Method
                  </h2>

                  <p className="text-sm text-slate-500">
                    Choose your preferred payment method
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label
                  className={`cursor-pointer rounded-2xl border p-5 transition ${
                    formData.payment === "cash"
                      ? "border-violet-500 bg-violet-50"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={
                      formData.payment === "cash"
                    }
                    onChange={handleChange}
                    className="sr-only"
                  />

                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100">
                      <Truck
                        size={21}
                        className="text-green-600"
                      />
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        Cash on Delivery
                      </p>

                      <p className="text-sm text-slate-500">
                        Pay when you receive
                      </p>
                    </div>
                  </div>
                </label>

                <label
                  className={`cursor-pointer rounded-2xl border p-5 transition ${
                    formData.payment === "card"
                      ? "border-violet-500 bg-violet-50"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={
                      formData.payment === "card"
                    }
                    onChange={handleChange}
                    className="sr-only"
                  />

                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                      <CreditCard
                        size={21}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        Credit Card
                      </p>

                      <p className="text-sm text-slate-500">
                        Demo payment
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {formData.payment === "card" && (
                <div className="mt-5 grid grid-cols-1 gap-5 rounded-2xl bg-slate-50 p-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="cardNumber"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Card Number
                    </label>

                    <input
                      id="cardNumber"
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      inputMode="numeric"
                      maxLength={19}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="expiryDate"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Expiry Date
                    </label>

                    <input
                      id="expiryDate"
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cvv"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      CVV
                    </label>

                    <input
                      id="cvv"
                      type="password"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      inputMode="numeric"
                      maxLength={4}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck
                      size={15}
                      className="text-green-600"
                    />
                    This is a demo payment form. No real
                    payment is processed.
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="h-14 w-full gap-2 rounded-2xl bg-violet-600 text-base font-bold shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
            >
              <CheckCircle size={20} />
              Place Order
            </Button>
          </form>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100">
                  <ShoppingBag
                    size={21}
                    className="text-violet-600"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Order Summary
                  </h2>

                  <p className="text-sm text-slate-500">
                    {itemCount}{" "}
                    {itemCount === 1
                      ? "item"
                      : "items"}
                  </p>
                </div>
              </div>

              <div className="mt-5 max-h-[400px] space-y-4 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const price = Number(
                    item.price || 0
                  );

                  const quantity = Number(
                    item.quantity || 0
                  );

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4"
                    >
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2">
                        <img
                          src={item.image}
                          alt={
                            item.title || "Product"
                          }
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                          {item.title ||
                            "Untitled Product"}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Qty: {quantity}
                        </p>

                        <p className="mt-1 font-bold text-green-600">
                          $
                          {(
                            price * quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 space-y-4 border-t border-slate-200 pt-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>

                  <span className="font-semibold text-slate-900">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>

                  <span className="font-bold text-green-600">
                    Free
                  </span>
                </div>

                <div className="flex justify-between border-t border-slate-200 pt-4">
                  <span className="text-xl font-black text-slate-900">
                    Total
                  </span>

                  <span className="text-2xl font-black text-violet-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-700">
                <ShieldCheck size={18} />
                Secure checkout
              </div>

              <Link
                to="/cart"
                className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-violet-600"
              >
                <ArrowLeft size={16} />
                Back to Cart
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Checkout;