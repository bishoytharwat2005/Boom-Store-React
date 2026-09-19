import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const PRODUCTS_API =
  "https://fakestoreapi.com/products";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const abortControllerRef = useRef(null);

  const fetchProducts = useCallback(async () => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();

    abortControllerRef.current = controller;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(PRODUCTS_API, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch products (${response.status})`
        );
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid products data received"
        );
      }

      setProducts(data);
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }

      setError(
        error.message ||
          "Something went wrong while loading products"
      );
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}

export default useProducts;