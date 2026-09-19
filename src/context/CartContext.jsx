import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

function getStorageData(key, fallback = []) {
  try {
    const data = localStorage.getItem(key);

    if (!data) {
      return fallback;
    }

    const parsedData = JSON.parse(data);

    return Array.isArray(parsedData)
      ? parsedData
      : fallback;
  } catch {
    return fallback;
  }
}

function CartProvider({ children }) {
  const [cart, setCart] = useState(() =>
    getStorageData("cart")
  );

  const [favorites, setFavorites] = useState(() =>
    getStorageData("favorites")
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const addToCart = useCallback((product) => {
    if (!product?.id) {
      return;
    }

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 0) + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    );
  }, []);

  const increaseQuantity = useCallback((productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity:
                Number(item.quantity || 0) + 1,
            }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 0) - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const updateQuantity = useCallback(
    (productId, quantity) => {
      const newQuantity = Math.max(
        0,
        Number(quantity) || 0
      );

      setCart((currentCart) =>
        currentCart
          .map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity: newQuantity,
                }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleFavorite = useCallback((product) => {
    if (!product?.id) {
      return;
    }

    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentFavorites.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentFavorites, product];
    });
  }, []);

  const isFavorite = useCallback(
    (productId) => {
      return favorites.some(
        (item) => item.id === productId
      );
    },
    [favorites]
  );

  const cartCount = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      favorites,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      updateQuantity,
      clearCart,
      toggleFavorite,
      isFavorite,
    }),
    [
      cart,
      favorites,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      updateQuantity,
      clearCart,
      toggleFavorite,
      isFavorite,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}

export { CartContext, CartProvider };
