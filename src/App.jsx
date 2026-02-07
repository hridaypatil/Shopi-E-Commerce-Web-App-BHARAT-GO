import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";   // ✅ NEW
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar onCartClick={() => setIsCartOpen(true)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />   {/* ✅ */}
          <Route path="/orders" element={<MyOrders />} />     {/* ✅ */}
        </Routes>

        {isCartOpen && (
          <Cart onClose={() => setIsCartOpen(false)} />
        )}
      </BrowserRouter>
    </CartProvider>
  );
}
