import { Link } from "react-router-dom";
import type { Product } from "../lib/types";

const colorMap: Record<string, string> = {
  Black: "#101010", White: "#f7f7f2", Navy: "#173a59", Stone: "#c9c2b7",
  Charcoal: "#55585a", Brown: "#6c5343",
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.slug}`} className="product-card group">
      <div className="product-photo">
        <img src={product.images[0]} alt={product.name} />
        {!product.inStock && <span className="sold-out">SOLD OUT</span>}
        <span className="product-heart">♡</span>
      </div>
      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <p>₹{product.price.toLocaleString("en-IN")}</p>
        </div>
        <div className="swatches">
          {product.colors.slice(0,3).map((c) => (
            <span key={c} title={c} style={{ backgroundColor: colorMap[c] ?? "#b8bdc0" }} />
          ))}
          {product.colors.length > 3 && <em>+{product.colors.length - 3}</em>}
        </div>
      </div>
    </Link>
  );
}
