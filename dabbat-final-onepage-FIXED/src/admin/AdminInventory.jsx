import React from "react";
import { AlertTriangle, Package } from "lucide-react";

const inventory = [
  ["Classic Navy Shirt", "Shirts", "42", "Healthy"],
  ["Tailored Trousers", "Trousers", "28", "Healthy"],
  ["Linen Overshirt", "Shirts", "12", "Low"],
  ["Oxford Shirt", "Shirts", "0", "Out"],
  ["Premium Chinos", "Trousers", "34", "Healthy"],
  ["Italian Wool Blazer", "Blazers", "9", "Low"]
];

export default function AdminInventory() {
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">STOCK CONTROL</p>
          <h1>Inventory</h1>
          <p>Monitor product availability and stock levels.</p>
        </div>
      </div>

      <div className="admin-inventory-cards">
        <div className="admin-mini-card">
          <Package size={20} />
          <div>
            <strong>125</strong>
            <span>Total units</span>
          </div>
        </div>

        <div className="admin-mini-card warning">
          <AlertTriangle size={20} />
          <div>
            <strong>2</strong>
            <span>Low stock</span>
          </div>
        </div>

        <div className="admin-mini-card danger">
          <Package size={20} />
          <div>
            <strong>1</strong>
            <span>Out of stock</span>
          </div>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Units</th>
                <th>Inventory status</th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((item) => (
                <tr key={item[0]}>
                  <td className="admin-product-name">{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>
                    <span
                      className={`admin-status ${item[3].toLowerCase()}`}
                    >
                      {item[3]}
                    </span>
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
