import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, checkout } = useCart(); // ✅ ADD checkout
  const nav = useNavigate();

  const handleCheckout = () => {
    checkout();              // ✅ SAVE ORDER
    nav("/orders");          // ✅ GO TO MY ORDERS
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <p>Total Items: {cart.length}</p>
          <button onClick={handleCheckout}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
