import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowUpRight } from "lucide-react";

const customers = [
  ["Rahul Menon", "rahul@example.com", "12", "INR 54,800", "Active"],
  ["Arjun Nair", "arjun@example.com", "8", "INR 42,600", "Active"],
  ["Adil Khan", "adil@example.com", "5", "INR 28,900", "Active"],
  ["Vivek Raj", "vivek@example.com", "4", "INR 19,400", "Active"],
  ["Nikhil Das", "nikhil@example.com", "2", "INR 11,200", "Inactive"]
];

export default function AdminCustomers() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">CUSTOMERS</p>
          <h1>Customers</h1>
          <p>View your Dabbat customer base.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={17} />
          <input placeholder="Search customers..." />
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Total spent</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr key={customer[1]}>
                  <td className="admin-product-name">
                    {customer[0]}
                  </td>
                  <td>{customer[1]}</td>
                  <td>{customer[2]}</td>
                  <td>{customer[3]}</td>
                  <td>
                    <span
                      className={`admin-status ${customer[4].toLowerCase()}`}
                    >
                      {customer[4]}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="admin-icon-button"
                      aria-label={`View ${customer[0]}`}
                      onClick={() => navigate(`/admin/customers/${customer[0].toLowerCase().replace(/[^a-z0-9]+/g, "-")}`)}
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
