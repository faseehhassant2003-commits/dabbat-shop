import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../lib/productStore";
import { getSiteImages } from "../lib/siteImageStore";

const reveal: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

export default function Home() {
  const [products, setProducts] = useState(getProducts);
  const [siteImages, setSiteImages] = useState(getSiteImages);
  const featuredProducts = products.slice(0, 5);

  useEffect(() => {
    const refreshProducts = () => setProducts(getProducts());
    const refreshSiteImages = () => setSiteImages(getSiteImages());
    window.addEventListener("storage", refreshProducts);
    window.addEventListener("dabbat-products-updated", refreshProducts);
    window.addEventListener("storage", refreshSiteImages);
    window.addEventListener("dabbat-site-images-updated", refreshSiteImages);
    return () => {
      window.removeEventListener("storage", refreshProducts);
      window.removeEventListener("dabbat-products-updated", refreshProducts);
      window.removeEventListener("storage", refreshSiteImages);
      window.removeEventListener("dabbat-site-images-updated", refreshSiteImages);
    };
  }, []);

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero-fullbleed" aria-label="Dabbat introduction">
        <img
          className="hero-fullbleed-image"
          src={siteImages.hero}
          alt="Dabbat menswear editorial"
        />

        <div className="hero-fullbleed-overlay" aria-hidden="true" />

        <div className="hero-fullbleed-content">
          <motion.p
            className="eyebrow hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            THE DABBAT SHOP / NOW OPEN
          </motion.p>

          <motion.h1
            className="hero-title-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            REFINED
            <br />
            ESSENTIALS<span>.</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            A new standard in modern men&apos;s fashion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              type="button"
              className="editorial-button-light"
              onClick={() =>
                document
                  .getElementById("collection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              SHOP THE COLLECTION
              <span>→</span>
            </button>
          </motion.div>

          <motion.div
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <strong>01</strong>
            <span className="short-rule" />
            <span>MODERN / MEN&apos;S WEAR</span>

            <span className="hero-meta-right">
              FOR A BRIGHTER
              <br />
              TOMORROW
            </span>
          </motion.div>

          <div className="hero-side-copy">
            <span className="side-line" />

            <span>
              CLOTHES
              <br />
              FOR A
              <br />
              CLEARER
              <br />
              TOMORROW
            </span>

            <span className="side-dot" />
          </div>

          <span className="hero-coord">DABBAT / 06 — 26</span>
        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" className="collection-section">
        <div className="collection-intro">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="eyebrow">SHOP / THE COLLECTION</p>

            <h2>
              THE COLLECTION<span>.</span>
            </h2>

            <p className="collection-subtitle">
              Refined essentials for everyday movement.
            </p>
          </motion.div>

          <motion.div
            className="collection-count"
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {products.length.toString().padStart(2, "0")} PIECES
          </motion.div>
        </div>

        <div className="collection-toolbar">
          <p className="collection-new-label">NEW COLLECTIONS</p>

          <Link
            to="/shop"
            className="collection-view-all"
          >
            VIEW ALL <span>→</span>
          </Link>
        </div>

        <div className="home-product-marquee">
          <div className="home-product-track">
            {[0, 1].map((set) => (
              <div className="home-product-set" key={set}>
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={`${set}-${product.id}`}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.32) }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="editorial-section" aria-label="The Dabbat standard">
        <motion.div
          className="editorial-copy"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="editorial-index">01 <span /> THE DABBAT STANDARD</div>

          <p className="eyebrow">THE DABBAT STANDARD</p>

          <h2>
            MADE FOR
            <br />
            <span>EVERYDAY.</span>
          </h2>

          <p className="editorial-description">
            Clean silhouettes, considered fabrics and effortless proportions
            designed to move with modern life.
          </p>

          <Link to="/shop" className="text-link editorial-link">
            EXPLORE THE COLLECTION <span>→</span>
          </Link>

          <div className="editorial-footnote">
            REFINED ESSENTIALS / BUILT FOR EVERYDAY MOVEMENT
          </div>
        </motion.div>

        <motion.div
          className="editorial-image"
          initial={{ opacity: 0, scale: 1.08, x: 24 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={siteImages.editorial}
            alt="Dabbat refined essentials editorial"
          />
          <div className="editorial-image-label">
            <span>THE EVERYDAY EDIT</span>
            <i />
            <small>DABBAT / 01</small>
          </div>
        </motion.div>
      </section>

      {/* CATEGORY BANNERS */}
      <section className="category-section">
        <motion.div
          className="category-tile category-tile-shirt"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <img src={siteImages.shirts} alt="Dabbat shirts" />
          <div className="category-fade" />
          <div className="category-copy">
            <p className="eyebrow">01 / SHIRTS</p>
            <h3>SHIRTS.</h3>
            <Link to="/shop?category=Shirts" className="explore-link">
              EXPLORE <b>→</b>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="category-tile category-tile-trouser"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <img src={siteImages.trousers} alt="Dabbat trousers" />
          <div className="category-fade" />
          <div className="category-copy">
            <p className="eyebrow">02 / TROUSERS</p>
            <h3>TROUSERS.</h3>
            <Link to="/shop?category=Trousers" className="explore-link">
              EXPLORE <b>→</b>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* SERVICE STRIP */}
      <section className="service-strip-light">
        <div className="service-item-light">
          <span className="service-icon">◌</span>
          <div>
            <strong>QUALITY FIRST</strong>
            <span>Considered fabrics &amp; construction</span>
          </div>
        </div>

        <div className="service-item-light">
          <span className="service-icon">↗</span>
          <div>
            <strong>INDIA / WORLDWIDE</strong>
            <span>Reliable delivery wherever you are</span>
          </div>
        </div>

        <div className="service-item-light">
          <span className="service-icon">↺</span>
          <div>
            <strong>EASY EXCHANGE</strong>
            <span>Simple returns &amp; exchange support</span>
          </div>
        </div>

        <div className="service-item-light">
          <span className="service-icon">□</span>
          <div>
            <strong>SECURE CHECKOUT</strong>
            <span>UPI, cards &amp; cash on delivery</span>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-light">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="eyebrow">THE DABBAT JOURNAL</p>
          <h2>
            STAY IN
            <br />
            <span>THE LOOP.</span>
          </h2>
          <p>New arrivals, quiet updates and the occasional good idea.</p>
        </motion.div>

        <form
          className="newsletter-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="YOUR EMAIL ADDRESS"
            aria-label="Email address"
          />
          <button type="submit">JOIN →</button>
        </form>
      </section>
    </div>
  );
}
