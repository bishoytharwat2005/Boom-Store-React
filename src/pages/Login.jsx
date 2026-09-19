import React, { useState } from "react";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router";

import { Button } from "../components/ui/button";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    let users = [];

    try {
      const storedUsers = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      users = Array.isArray(storedUsers)
        ? storedUsers
        : [];
    } catch {
      setError(
        "Unable to access your account data. Please try again."
      );
      return;
    }

    const user = users.find((item) => {
      if (!item?.email || !item?.password) {
        return false;
      }

      return (
        item.email.trim().toLowerCase() === email &&
        item.password === password
      );
    });

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    localStorage.setItem("isLoggedIn", "true");

    window.dispatchEvent(
      new Event("authChange")
    );

    const requestedPath = location.state?.from;

    const from =
      typeof requestedPath === "string" &&
      requestedPath.startsWith("/")
        ? requestedPath
        : "/products";

    navigate(from, {
      replace: true,
    });
  }

  const isCheckoutRedirect =
    location.state?.from === "/checkout";

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-center">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />

          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 shadow-lg shadow-violet-950/40">
              <ShoppingBag size={28} />
            </div>

            <h1 className="mt-7 text-4xl font-black tracking-tight">
              Welcome Back
            </h1>

            <p className="mt-5 max-w-md leading-8 text-slate-400">
              Login to your ShopStore account and continue
              shopping with a simple and enjoyable
              experience.
            </p>

            <div className="mt-8 space-y-4 text-slate-300">
              <div className="flex items-center gap-3">
                <CheckCircle
                  size={19}
                  className="shrink-0 text-violet-400"
                />

                <span>Access your favorites</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle
                  size={19}
                  className="shrink-0 text-violet-400"
                />

                <span>Manage your shopping cart</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle
                  size={19}
                  className="shrink-0 text-violet-400"
                />

                <span>Complete your orders</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">
              Welcome Back
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
              Login
            </h2>

            <p className="mt-2 text-gray-500">
              Login to continue to your account.
            </p>
          </div>

          {isCheckoutRedirect && (
            <div
              role="status"
              className="mb-5 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700"
            >
              Please login to continue to checkout.
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-slate-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

                <button
                  type="button"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  aria-pressed={showPassword}
                  onClick={() =>
                    setShowPassword(
                      (value) => !value
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md text-gray-400 transition hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-200"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/products"
                className="text-sm font-semibold text-violet-600 transition hover:text-violet-700"
              >
                Back to Store
              </Link>
            </div>

            <Button
              type="submit"
              className="h-12 w-full gap-2 rounded-xl bg-violet-600 font-bold shadow-lg shadow-violet-200 transition hover:bg-violet-700"
            >
              <LogIn size={18} />
              Login
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-violet-600 transition hover:text-violet-700"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;