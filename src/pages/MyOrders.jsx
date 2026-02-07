import { useCart } from "../context/CartContext";

export default function MyOrders() {
  const { orders } = useCart();

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map(order => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px"
          }}
        >
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>

          {order.items.map(item => (
            <div key={item.id}>
              {item.title} × {item.qty}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
