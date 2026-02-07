import "../styles/navbar.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";   // ✅ ADD THIS

export default function Navbar({ onCartClick }) {
  const { cart } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2 className="logo">Shopi</h2>

        <nav className="nav-links">
          <span className="active">All</span>
          <span>Clothes</span>
          <span>Electronics</span>
          <span>Furnitures</span>
          <span>Toys</span>
        </nav>
      </div>

      <div className="navbar-right">
        <span className="user-email">userintheapp@test.com</span>

        {/* ✅ MY ORDERS BUTTON */}
        <Link to="/orders" className="nav-link">
          My Orders
        </Link>

        <Link to="/account" className="nav-link">
          My Account
        </Link>

        {/* CART ICON */}
        <div className="cart-icon" onClick={onCartClick}>
          🛒 <span className="cart-count">{cart.length}</span>
        </div>
      </div>
    </header>
  );
}
