import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // CART
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // ORDERS
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // SAVE ORDERS
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ADD TO CART
  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) {
        return prev.map(p =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // INCREASE QTY (+)
  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // DECREASE QTY (−)
  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter(item => item.qty > 0)
    );
  };

  // REMOVE ITEM (X)
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // CHECKOUT
  const checkout = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: cart,
      total: cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      )
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]); // CLEAR CART
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
