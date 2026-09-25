import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts } from "../lib/productStore";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProducts().find((p) => p.slug === slug);
  const { addToCart } = useCart();
  const availableSizes = product?.sizes.length ? product.sizes : ["One size"];
  const availableColors = product?.colors.length ? product.colors : ["Default"];

  const [size, setSize] = useState(availableSizes[0]);
  const [color, setColor] = useState(availableColors[0]);
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
            {availableSizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
                className={`product-option tag px-4 py-2 border transition-colors ${size === s ? "selected" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="tag mb-2">COLOR</p>
          <div className="flex gap-2 flex-wrap">
            {availableColors.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={color === c}
                onClick={() => setColor(c)}
                className={`product-option tag px-4 py-2 border transition-colors ${color === c ? "selected" : ""}`}
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
