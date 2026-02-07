import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";

export default function Cart({ onClose }) {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useCart();

  const nav = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    onClose();          // close drawer
    nav("/checkout");  // go to checkout page
  };

  return (
    <aside className="checkout-panel">
      {/* HEADER */}
      <div className="checkout-header">
        <h2>My Order</h2>

        {/* ❌ CLOSE BUTTON */}
        <span className="close-btn" onClick={onClose}>
          ✕
        </span>
      </div>

      {/* ITEMS */}
      <div className="checkout-items">
        {cart.length === 0 && (
          <p style={{ color: "#777" }}>Your cart is empty</p>
        )}

        {cart.map(item => (
          <div className="checkout-item" key={item.id}>
            <img src={item.images?.[0]} alt={item.title} />

            <div className="item-info">
              <p>{item.title}</p>
              <strong>${item.price}</strong>
            </div>

            {/* ✅ FIXED + / − BUTTONS */}
            <div className="qty-controls">
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.qty}</span>
              <button
                className="plus"
                onClick={() => increaseQty(item.id)}
              >
                +
              </button>
            </div>

            <button
              className="remove"
              onClick={() => removeFromCart(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="checkout-footer">
        <div className="total">
          <span>Total:</span>
          <strong>${total}</strong>
        </div>

        {/* ✅ CHECKOUT BUTTON */}
        <button
          className="checkout-btn"
          disabled={cart.length === 0}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </aside>
  );
}
