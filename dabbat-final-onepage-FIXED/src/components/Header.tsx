import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { items } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const scrollTo = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(
      query.trim()
        ? `/shop?search=${encodeURIComponent(query.trim())}`
        : "/shop"
    );
    setSearchOpen(false);
  };

  const openShop = (params = "") => {
    navigate(`/shop${params}`);
  };

  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand-lockup" aria-label="Dabbat home">
          <img
            src={theme === "dark" ? "/images/dabbat-white-exact.svg" : "/dabbat-logo.png"}
            alt="Dabbat"
          />
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          <button
            type="button"
            className={location.pathname === "/" ? "active" : ""}
            onClick={() => scrollTo("collection")}
          >
            SHOP
          </button>

          <button type="button" onClick={() => scrollTo("collection")}>
            NEW ARRIVALS
          </button>

          <button type="button" onClick={() => openShop("?category=Shirts")}>
            SHIRTS
          </button>

          <button type="button" onClick={() => openShop("?category=Trousers")}>
            TROUSERS
          </button>

          <button type="button" onClick={() => openShop("?sort=best")}>
            BEST SELLERS
          </button>
        </nav>

        <div className="header-tools">
          <button
            className="plain-icon search-button"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <span className="search-icon" />
          </button>

          <button className="plain-icon" aria-label="Wishlist">
            <span className="heart-icon">♡</span>
          </button>

          <Link
            to="/cart"
            className="cart-link"
            aria-label={`Cart${count ? `, ${count} items` : ""}`}
          >
            <span className="cart-icon" />
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>

          <Link to="/login" className="account-link" aria-label="Account">
            <span className="account-icon" aria-hidden="true" />
          </Link>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle colour theme"
          >
            <span />
          </button>
        </div>
      </header>

      {searchOpen && (
        <form className="search-bar" onSubmit={submitSearch}>
          <span className="eyebrow">SEARCH / DABBAT</span>

          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shirts, trousers..."
          />

          <button type="submit">→</button>
        </form>
      )}
    </>
  );
}
