import React from "react";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./Router/routes";

function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default App;