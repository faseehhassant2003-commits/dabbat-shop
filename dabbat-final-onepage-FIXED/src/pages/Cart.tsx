import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="px-6 md:px-10 py-16">
        <p className="eyebrow mb-2">YOUR CART</p>
        <h1 className="text-3xl font-extrabold tracking-tight mb-6">Empty for now.</h1>
        <Link to="/shop" className="tag border border-[var(--line-strong)] px-6 py-3 inline-block">
          BROWSE THE SHOP →
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-12">
      <p className="eyebrow mb-2">YOUR CART</p>
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">
        {items.length} item{items.length > 1 ? "s" : ""}
      </h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={`${item.product.id}-${item.size}-${item.color}`}
            className="flex items-center gap-6 border-b border-[var(--line-soft)] pb-6"
          >
            <div className="w-24 aspect-[3/4] bg-[var(--surface-1)] border border-[var(--line-soft)] flex-none" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="tag mt-1">
                {item.size} / {item.color.toUpperCase()}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.product.id, item.size, item.color, Number(e.target.value))
                  }
                  className="bg-transparent border border-[var(--line-soft)] px-2 py-1 tag"
                >
                  {[1, 2, 3, 4, 5].map((q) => (
                    <option key={q} value={q}>
                      QTY {q}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                  className="tag text-[var(--t5)] hover:text-[var(--fg-max)]"
                >
                  REMOVE
                </button>
              </div>
            </div>
            <p className="text-[var(--t2)]">
              ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-10 max-w-sm ml-auto">
        <span className="tag">TOTAL</span>
        <span className="text-xl font-semibold">₹{total.toLocaleString("en-IN")}</span>
      </div>

      <div className="flex justify-end mt-6">
        <button className="tag border border-[var(--line-strong)] px-8 py-3 hover:border-[var(--accent)] hover:text-[var(--fg-max)] transition-colors">
          CHECKOUT →
        </button>
      </div>
    </div>
  );
}
