import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockProducts } from "../lib/mockData";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = mockProducts.find((p) => p.slug === slug);
  const { addToCart } = useCart();

  const [size, setSize] = useState(product?.sizes[0] ?? "");
  const [color, setColor] = useState(product?.colors[0] ?? "");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="px-6 md:px-10 py-16">
        <p>Product not found.</p>
        <Link to="/shop" className="tag underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ product, size, color, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="px-6 md:px-10 py-12 grid md:grid-cols-2 gap-10">
      <div className="product-detail-image">
        <img src={product.images[0]} alt={product.name} />
      </div>

      <div>
        <p className="eyebrow mb-2">{product.category.toUpperCase()}</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">{product.name}</h1>
        <p className="text-xl text-[var(--t2)] mb-6">₹{product.price.toLocaleString("en-IN")}</p>
        <p className="text-[var(--t3)] leading-relaxed mb-8 max-w-md">{product.description}</p>

        <div className="mb-6">
          <p className="tag mb-2">SIZE</p>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`tag px-4 py-2 border transition-colors ${
                  size === s
                    ? "border-[var(--accent)] text-[var(--fg-max)]"
                    : "border-[var(--line-soft)] text-[var(--t4)]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="tag mb-2">COLOR</p>
          <div className="flex gap-2 flex-wrap">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`tag px-4 py-2 border transition-colors ${
                  color === c
                    ? "border-[var(--accent)] text-[var(--fg-max)]"
                    : "border-[var(--line-soft)] text-[var(--t4)]"
                }`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="tag border border-[var(--line-strong)] px-8 py-3 hover:border-[var(--accent)] hover:text-[var(--fg-max)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {!product.inStock ? "SOLD OUT" : added ? "ADDED ✓" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}
