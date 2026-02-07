import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");   // ✅ NEW
  const { addToCart } = useCart();

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  // ✅ FILTER PRODUCTS
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* SEARCH BAR */}
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <input
          type="text"
          placeholder="classic red"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "400px",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      {/* PRODUCTS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "10px",
          padding: "10px"
        }}
      >
        {filteredProducts.map(p => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <Link to={`/product/${p.id}`}>
              <img
                src={p.images[0]}
                alt={p.title}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
            </Link>
            <h4>{p.title}</h4>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
}
