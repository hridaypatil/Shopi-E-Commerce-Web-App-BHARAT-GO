import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div style={{padding:'20px'}}>
      <h2>Order Placed Successfully 🎉</h2>
      <Link to="/">Go Home</Link>
    </div>
  );
}
