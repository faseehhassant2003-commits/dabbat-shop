import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowUpRight } from "lucide-react";

const orders = [
  ["#DB-1048", "Rahul Menon", "INR 4,500", "13 Sep 2026", "CONFIRMED"],
  ["#DB-1047", "Arjun Nair", "INR 6,200", "13 Sep 2026", "SHIPPED"],
  ["#DB-1046", "Adil Khan", "INR 5,800", "12 Sep 2026", "PENDING"],
  ["#DB-1045", "Vivek Raj", "INR 4,200", "12 Sep 2026", "DELIVERED"],
  ["#DB-1044", "Nikhil Das", "INR 5,400", "11 Sep 2026", "DELIVERED"],
  ["#DB-1043", "Akhil Thomas", "INR 8,900", "11 Sep 2026", "CANCELLED"]
];

export default function AdminOrders() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">SALES</p>
          <h1>Orders</h1>
          <p>Track and manage customer orders.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={17} />
          <input placeholder="Search orders..." />
        </div>

        <select className="admin-select">
          <option>All statuses</option>
          <option>PENDING</option>
          <option>CONFIRMED</option>
          <option>SHIPPED</option>
          <option>DELIVERED</option>
          <option>CANCELLED</option>
        </select>
      </div>

      <div className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order[0]}>
                  <td className="admin-product-name">{order[0]}</td>
                  <td>{order[1]}</td>
                  <td>{order[2]}</td>
                  <td>{order[3]}</td>
                  <td>
                    <span
                      className={`admin-status ${order[4].toLowerCase()}`}
                    >
                      {order[4]}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="admin-icon-button"
                      aria-label={`View ${order[0]}`}
                      onClick={() => navigate(`/admin/orders/${order[0].replace("#", "")}`)}
                    >
                      <ArrowUpRight size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
