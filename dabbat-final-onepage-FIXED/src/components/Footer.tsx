import { Link } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/">
            <img
              src={theme === "dark" ? "/images/dabbat-white-exact.svg" : "/dabbat-logo.png"}
              alt="Dabbat"
            />
          </Link>
          <p>
            REFINED ESSENTIALS
            <br />
            FOR A BRIGHTER TOMORROW.
          </p>
          <div className="social-links">
            <span>IG</span>
            <span>FB</span>
            <span>PI</span>
            <span>YT</span>
          </div>
        </div>

        <div className="footer-column">
          <span className="eyebrow">SHOP</span>
          <a href="/#collection">New Arrivals</a>
          <a href="/#collection">Shirts</a>
          <a href="/#collection">Trousers</a>
          <a href="/#collection">Best Sellers</a>
        </div>

        <div className="footer-column">
          <span className="eyebrow">HELP</span>
          <a href="mailto:hello@dabbat.in">Contact Us</a>
          <a href="#size-guide">Size Guide</a>
          <a href="#shipping">Shipping &amp; Delivery</a>
          <a href="#returns">Returns &amp; Exchange</a>
        </div>

        <div className="footer-column">
          <span className="eyebrow">LEGAL</span>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms &amp; Conditions</a>
          <a href="#refunds">Refund Policy</a>
        </div>

        <div className="footer-column footer-connect">
          <span className="eyebrow">STAY CONNECTED</span>
          <p className="payment-note">VISA · MASTERCARD · UPI · COD</p>
          <p className="payment-note">INDIA / WORLDWIDE</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 DABBAT. ALL RIGHTS RESERVED.</span>
        <span>DESIGNED WITH INTENT.</span>
        <span>CLOTHES FOR A CLEARER TOMORROW.</span>
      </div>
    </footer>
  );
}
