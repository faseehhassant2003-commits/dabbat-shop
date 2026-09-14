import React from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Users,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "INR 2,48,650",
    change: "+12.8%",
    positive: true,
    icon: IndianRupee
  },
  {
    title: "Orders",
    value: "184",
    change: "+8.4%",
    positive: true,
    icon: ShoppingBag
  },
  {
    title: "Products",
    value: "42",
    change: "+4.2%",
    positive: true,
    icon: Package
  },
  {
    title: "Customers",
    value: "1,248",
    change: "-2.1%",
    positive: false,
    icon: Users
  }
];

const orders = [
  ["#DB-1048", "Rahul Menon", "Classic Navy Shirt", "INR 4,500", "Paid"],
  ["#DB-1047", "Arjun Nair", "Tailored Trousers", "INR 6,200", "Paid"],
  ["#DB-1046", "Adil Khan", "Linen Overshirt", "INR 5,800", "Pending"],
  ["#DB-1045", "Vivek Raj", "Oxford Shirt", "INR 4,200", "Paid"],
  ["#DB-1044", "Nikhil Das", "Premium Chinos", "INR 5,400", "Paid"]
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p>Welcome back. Here's what's happening with Dabbat.</p>
        </div>

        <Link className="admin-primary-button" to="/">
          View Store
        </Link>
      </div>

      <div className="admin-stat-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="admin-stat-card" key={stat.title}>
              <div className="admin-stat-top">
                <span>{stat.title}</span>
                <div className="admin-stat-icon">
                  <Icon size={18} />
                </div>
              </div>

              <div className="admin-stat-value">
                {stat.value}
              </div>

              <div
                className={`admin-stat-change ${
                  stat.positive ? "positive" : "negative"
                }`}
              >
                {stat.positive ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {stat.change}
                <span>vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="admin-dashboard-grid">
        <div className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-eyebrow">RECENT ACTIVITY</p>
              <h2>Recent Orders</h2>
            </div>
            <Link to="/admin/orders">View all</Link>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order[0]}>
                    <td>{order[0]}</td>
                    <td>{order[1]}</td>
                    <td>{order[2]}</td>
                    <td>{order[3]}</td>
                    <td>
                      <span
                        className={`admin-status ${
                          order[4].toLowerCase()
                        }`}
                      >
                        {order[4]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-eyebrow">PERFORMANCE</p>
              <h2>Sales Overview</h2>
            </div>
          </div>

          <div className="admin-chart">
            {[45, 62, 48, 76, 58, 88, 70, 94, 78, 85, 72, 98].map(
              (height, index) => (
                <div className="admin-bar-wrap" key={index}>
                  <div
                    className="admin-bar"
                    style={{ height: `${height}%` }}
                  />
                  <small>
                    {["J","F","M","A","M","J","J","A","S","O","N","D"][index]}
                  </small>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
