import React from "react";
import { Link, useParams } from "react-router-dom";

export default function AdminProductDetail() {
  const { productSlug = "classic-navy-shirt" } = useParams();
  const productName = productSlug.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");

  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">CATALOGUE / PRODUCT DETAIL</p>
          <h1>{productName}</h1>
          <p>Review product information, pricing, and stock.</p>
        </div>
        <Link className="admin-secondary-button" to="/admin/products">Back to products</Link>
      </div>

      <div className="admin-detail-grid">
        <section className="admin-detail-card">
          <p className="admin-eyebrow">PRODUCT INFORMATION</p>
          <div className="admin-detail-list">
            <div><span>Category</span><strong>Shirts</strong></div>
            <div><span>Price</span><strong>INR 4,500</strong></div>
            <div><span>Availability</span><strong className="admin-status in-stock">In stock</strong></div>
          </div>
        </section>
        <section className="admin-detail-card">
          <p className="admin-eyebrow">INVENTORY</p>
          <h2>42 units</h2>
          <p>Healthy stock level</p>
          <Link className="admin-detail-link" to="/admin/inventory">View inventory <span>→</span></Link>
        </section>
      </div>
    </div>
  );
}
