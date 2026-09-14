import React from "react";
import { Link, useParams } from "react-router-dom";

export default function AdminCustomerDetail() {
  const { customerSlug = "rahul-menon" } = useParams();
  const customerName = customerSlug.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");

  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">CUSTOMERS / PROFILE</p>
          <h1>{customerName}</h1>
          <p>Customer profile, order history, and account activity.</p>
        </div>
        <Link className="admin-secondary-button" to="/admin/customers">Back to customers</Link>
      </div>

      <div className="admin-detail-grid">
        <section className="admin-detail-card">
          <p className="admin-eyebrow">PROFILE</p>
          <div className="admin-detail-list">
            <div><span>Email</span><strong>{customerSlug}@example.com</strong></div>
            <div><span>Status</span><strong className="admin-status active">Active</strong></div>
            <div><span>Member since</span><strong>January 2025</strong></div>
          </div>
        </section>
        <section className="admin-detail-card">
          <p className="admin-eyebrow">LIFETIME VALUE</p>
          <h2>INR 54,800</h2>
          <p>12 completed orders</p>
          <p>Last order: 13 Sep 2026</p>
        </section>
      </div>

      <section className="admin-panel admin-detail-card admin-detail-products">
        <p className="admin-eyebrow">RECENT ORDERS</p>
        <div className="admin-detail-list">
          <div><span>#DB-1048 · Classic Navy Shirt</span><strong>INR 4,500</strong></div>
          <div><span>#DB-1032 · Premium Chinos</span><strong>INR 5,400</strong></div>
        </div>
      </section>
    </div>
  );
}
