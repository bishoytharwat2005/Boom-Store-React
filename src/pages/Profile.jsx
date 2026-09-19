import React, { useEffect, useRef, useState } from "react";

import {
  User,
  Mail,
  Phone,
  Camera,
  ShoppingCart,
  Heart,
  LogOut,
  Pencil,
  ShieldCheck,
  Package,
  ArrowRight,
  Save,
  X,
} from "lucide-react";

import { Link, useNavigate } from "react-router";

import { Button } from "../components/ui/button";

import { useCart } from "../context/CartContext";

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { cartCount, favorites } = useCart();

  const [user, setUser] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedUser = JSON.parse(
        localStorage.getItem("currentUser")
      );

      if (!savedUser) {
        navigate("/login", { replace: true });
        return;
      }

      setUser(savedUser);

      setFormData({
        name: savedUser.name || "",
        email: savedUser.email || "",
        phone: savedUser.phone || "",
      });
    } catch {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  }

  function handleSave() {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    const updatedUser = {
      ...user,
      name,
      email,
      phone,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setFormData({
      name,
      email,
      phone,
    });

    setIsEditing(false);
    setError("");

    window.dispatchEvent(new Event("authChange"));
  }

  function handleCancel() {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });

    setError("");
    setIsEditing(false);
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const updatedUser = {
        ...user,
        photo: reader.result,
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

      window.dispatchEvent(new Event("authChange"));
    };

    reader.readAsDataURL(file);
  }

  function handleLogout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");

    window.dispatchEvent(new Event("authChange"));

    navigate("/products", { replace: true });
  }

  if (!user) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-10 sm:py-14 lg:py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-3 text-slate-500">
            Manage your account information and shopping
            activity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <aside className="lg:col-span-1">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="relative h-28 bg-slate-950">
                <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-violet-100 text-violet-600 shadow-xl">
                      {user.photo ? (
                        <img
                          src={user.photo}
                          alt={user.name || "Profile"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User size={48} />
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      aria-label="Change profile photo"
                      className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-violet-600 text-white shadow-lg transition hover:bg-violet-700"
                    >
                      <Camera size={16} />
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-20 text-center">
                <h2 className="truncate text-xl font-black text-slate-900">
                  {user.name || "User"}
                </h2>

                <p className="mt-1 truncate text-sm text-slate-500">
                  {user.email || "No email"}
                </p>

                <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                  <ShieldCheck size={17} />
                  Account Active
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <Link
                to="/cart"
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition group-hover:scale-105">
                  <ShoppingCart size={19} />
                </div>

                <p className="mt-4 text-2xl font-black text-slate-900">
                  {cartCount}
                </p>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Cart Items
                </p>
              </Link>

              <Link
                to="/favorites"
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 transition group-hover:scale-105">
                  <Heart size={19} />
                </div>

                <p className="mt-4 text-2xl font-black text-slate-900">
                  {favorites.length}
                </p>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Favorites
                </p>
              </Link>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-white px-5 py-3.5 font-bold text-red-500 transition hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </aside>

          <main className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Update your account details.
                  </p>
                </div>

                {!isEditing && (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-full gap-2 rounded-xl bg-violet-600 font-bold hover:bg-violet-700 sm:w-auto"
                  >
                    <Pencil size={17} />
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="p-6 sm:p-8">
                {error && (
                  <div
                    role="alert"
                    className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="profile-name"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Full Name
                    </label>

                    {isEditing ? (
                      <div className="relative">
                        <User
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          id="profile-name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                        />
                      </div>
                    ) : (
                      <div className="flex h-12 items-center gap-3 rounded-xl bg-slate-50 px-4">
                        <User
                          size={18}
                          className="text-slate-400"
                        />

                        <span className="font-semibold text-slate-900">
                          {user.name || "Not provided"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="profile-email"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Email Address
                    </label>

                    {isEditing ? (
                      <div className="relative">
                        <Mail
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          id="profile-email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                        />
                      </div>
                    ) : (
                      <div className="flex h-12 items-center gap-3 rounded-xl bg-slate-50 px-4">
                        <Mail
                          size={18}
                          className="text-slate-400"
                        />

                        <span className="truncate font-semibold text-slate-900">
                          {user.email || "Not provided"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="profile-phone"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Phone Number
                    </label>

                    {isEditing ? (
                      <div className="relative">
                        <Phone
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          id="profile-phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                        />
                      </div>
                    ) : (
                      <div className="flex h-12 items-center gap-3 rounded-xl bg-slate-50 px-4">
                        <Phone
                          size={18}
                          className="text-slate-400"
                        />

                        <span className="font-semibold text-slate-900">
                          {user.phone || "Not provided"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      onClick={handleCancel}
                      className="gap-2 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50"
                    >
                      <X size={17} />
                      Cancel
                    </Button>

                    <Button
                      type="button"
                      onClick={handleSave}
                      className="gap-2 rounded-xl bg-violet-600 font-bold text-white hover:bg-violet-700"
                    >
                      <Save size={17} />
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Link
                to="/products"
                className="group flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                    <Package size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Browse Products
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Discover new products
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={19}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-violet-600"
                />
              </Link>

              <Link
                to="/favorites"
                className="group flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                    <Heart size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Your Favorites
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      View saved products
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={19}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-violet-600"
                />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

export default Profile;