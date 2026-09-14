import React from "react";
import { Link, useParams } from "react-router-dom";

export default function AdminOrderDetail() {
  const { orderId = "DB-1048" } = useParams();

  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">SALES / ORDER DETAIL</p>
          <h1>Order #{orderId}</h1>
          <p>Review fulfilment, payment, and customer information.</p>
        </div>
        <Link className="admin-secondary-button" to="/admin/orders">Back to orders</Link>
      </div>

      <div className="admin-detail-grid">
        <section className="admin-detail-card">
          <p className="admin-eyebrow">ORDER SUMMARY</p>
          <div className="admin-detail-list">
            <div><span>Status</span><strong className="admin-status confirmed">Confirmed</strong></div>
            <div><span>Placed</span><strong>13 Sep 2026</strong></div>
            <div><span>Payment</span><strong>Paid via UPI</strong></div>
            <div><span>Total</span><strong>INR 4,500</strong></div>
          </div>
        </section>
        <section className="admin-detail-card">
          <p className="admin-eyebrow">CUSTOMER</p>
          <h2>Rahul Menon</h2>
          <p>rahul@example.com</p>
          <p>12 orders · INR 54,800 spent</p>
          <Link className="admin-detail-link" to="/admin/customers/rahul-menon">View customer <span>→</span></Link>
        </section>
      </div>

      <section className="admin-panel admin-detail-card admin-detail-products">
        <p className="admin-eyebrow">ITEMS</p>
        <div className="admin-detail-list">
          <div><span>Classic Navy Shirt</span><strong>1 × INR 4,500</strong></div>
        </div>
      </section>
    </div>
  );
}
