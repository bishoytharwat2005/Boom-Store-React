import React, { useEffect, useState } from "react";

import {
  ShoppingCart,
  Store,
  Menu,
  X,
  Heart,
  LogIn,
  UserPlus,
  User,
  LogOut,
  Home as HomeIcon,
  Info,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router";

import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    function handleAuthChange() {
      setIsLoggedIn(
        localStorage.getItem("isLoggedIn") === "true"
      );

      try {
        setUser(
          JSON.parse(localStorage.getItem("currentUser"))
        );
      } catch {
        setUser(null);
      }
    }

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener(
        "authChange",
        handleAuthChange
      );
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  function handleLogout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
    setUser(null);
    setMenuOpen(false);

    window.dispatchEvent(new Event("authChange"));

    navigate("/products");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function isActive(path) {
    return location.pathname === path;
  }

  const navItems = [
    {
      to: "/",
      label: "Home",
      icon: HomeIcon,
    },
    {
      to: "/about",
      label: "About",
      icon: Info,
    },
    {
      to: "/products",
      label: "Products",
    },
    {
      to: "/favorites",
      label: "Favorites",
      icon: Heart,
    },
  ];

  function getNavClass(path) {
    return `flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
      isActive(path)
        ? "bg-violet-50 text-violet-600"
        : "text-slate-700 hover:bg-violet-50 hover:text-violet-600"
    }`;
  }

  function getMobileNavClass(path) {
    return `flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${
      isActive(path)
        ? "bg-violet-50 text-violet-600"
        : "text-slate-700 hover:bg-violet-50 hover:text-violet-600"
    }`;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200 transition duration-300 group-hover:scale-105 group-hover:shadow-violet-300">
              <Store size={23} />
            </div>

            <div className="leading-none">
              <p className="text-xl font-extrabold tracking-tight text-slate-900">
                Shop
                <span className="text-violet-600">
                  Store
                </span>
              </p>

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                Simple Shopping
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={getNavClass(item.to)}
                >
                  {Icon && <Icon size={17} />}
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="group flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-2 transition hover:bg-violet-50"
                >
                  <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-violet-100 text-violet-600">
                    {user?.photo ? (
                      <img
                        src={user.photo}
                        alt={user?.name || "User"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User size={18} />
                    )}
                  </div>

                  <div className="max-w-28">
                    <p className="truncate text-sm font-bold text-slate-900 group-hover:text-violet-600">
                      {user?.name || "User"}
                    </p>

                    <p className="text-xs text-gray-400">
                      Account
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <LogIn size={17} />
                  Login
                </Link>

                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-violet-300"
                >
                  <UserPlus size={17} />
                  Register
                </Link>
              </>
            )}

            <Link
              to="/cart"
              aria-label="Shopping cart"
              className={`relative ml-1 flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                isActive("/cart")
                  ? "border-violet-200 bg-violet-50 text-violet-600"
                  : "border-slate-200 bg-white text-slate-700 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
              }`}
            >
              <ShoppingCart size={21} />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-[11px] font-bold text-white ring-2 ring-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/cart"
              onClick={closeMenu}
              aria-label="Shopping cart"
              className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                isActive("/cart")
                  ? "border-violet-200 bg-violet-50 text-violet-600"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              <ShoppingCart size={20} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label={
                menuOpen ? "Close menu" : "Open menu"
              }
              aria-expanded={menuOpen}
              onClick={() =>
                setMenuOpen((value) => !value)
              }
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100"
            >
              {menuOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-100 py-5 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className={getMobileNavClass(item.to)}
                  >
                    {Icon && <Icon size={18} />}
                    {item.label}
                  </Link>
                );
              })}

              <Link
                to="/cart"
                onClick={closeMenu}
                className={getMobileNavClass("/cart")}
              >
                <ShoppingCart size={18} />
                Cart

                {cartCount > 0 && (
                  <span className="ml-auto rounded-full bg-violet-600 px-2 py-0.5 text-xs font-bold text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              <div className="my-2 h-px bg-slate-100" />

              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 transition hover:bg-violet-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-violet-100 text-violet-600">
                      {user?.photo ? (
                        <img
                          src={user.photo}
                          alt={user?.name || "User"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User size={19} />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {user?.name || "User"}
                      </p>

                      <p className="text-xs text-gray-400">
                        Account
                      </p>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    <LogIn size={18} />
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
                  >
                    <UserPlus size={18} />
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
