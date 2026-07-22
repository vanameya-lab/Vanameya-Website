"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("vanameya_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("vanameya_cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (product, quantity = 1, type = "one-time") => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.type === type
      );

      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        newCart[existingItemIndex].price = calculateUnitPrice(type, newCart[existingItemIndex].quantity);
        return newCart;
      }

      return [...prev, { product, quantity, type, price: calculateUnitPrice(type, quantity) }];
    });
    setIsCartOpen(true);
  };

  const calculateUnitPrice = (type, qty) => {
    const basePrice = 149;
    const subscriptionDiscount = 0.85;
    let pricePerBox = type === "subscribe" ? Math.round(basePrice * subscriptionDiscount) : basePrice;
    
    if (qty >= 5) {
      return Math.round(pricePerBox * 0.94); // 6% discount
    } else if (qty >= 2) {
      return Math.round(pricePerBox * 0.96); // 4% discount
    }
    return pricePerBox;
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prev) => {
      const newCart = [...prev];
      newCart[index].quantity = newQuantity;
      newCart[index].price = calculateUnitPrice(newCart[index].type, newQuantity);
      return newCart;
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = (state) => {
    setIsCartOpen(state !== undefined ? state : !isCartOpen);
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleCart,
        cartSubtotal,
        cartItemCount,
        isInitialized
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
