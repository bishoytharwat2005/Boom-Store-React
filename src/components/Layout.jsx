import React from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />

      <main
        id="main-content"
        className="flex-1"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
