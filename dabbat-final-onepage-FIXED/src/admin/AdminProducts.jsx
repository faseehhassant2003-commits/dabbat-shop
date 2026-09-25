import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, ArrowUpRight } from "lucide-react";
import { getProducts } from "../lib/productStore";

const seedProducts = [
  ["Classic Navy Shirt", "Shirts", "INR 4,500", "42", "In stock"],
  ["Tailored Trousers", "Trousers", "INR 6,200", "28", "In stock"],
  ["Linen Overshirt", "Shirts", "INR 5,800", "12", "Low stock"],
  ["Oxford Shirt", "Shirts", "INR 4,200", "0", "Out of stock"],
  ["Premium Chinos", "Trousers", "INR 5,400", "34", "In stock"],
  ["Italian Wool Blazer", "Blazers", "INR 12,500", "9", "Low stock"]
];

export default function AdminProducts() {
  const navigate = useNavigate();
  const products = [
    ...seedProducts,
    ...getProducts()
      .filter((product) => product.id > 5)
      .map((product) => [
        product.name,
        product.category,
        `INR ${product.price.toLocaleString("en-IN")}`,
        product.inStock ? "In stock" : "0",
        product.inStock ? "In stock" : "Out of stock",
      ]),
  ];

  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">CATALOGUE</p>
          <h1>Products</h1>
          <p>Manage your Dabbat product catalogue.</p>
        </div>

        <Link className="admin-primary-button" to="/admin/products/new">
          <Plus size={17} />
          Add Product
        </Link>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={17} />
          <input placeholder="Search products..." />
        </div>

        <select className="admin-select">
          <option>All categories</option>
          <option>Shirts</option>
          <option>Trousers</option>
          <option>Blazers</option>
        </select>
      </div>

      <div className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product[0]}>
                  <td className="admin-product-name">
                    {product[0]}
                  </td>
                  <td>{product[1]}</td>
                  <td>{product[2]}</td>
                  <td>{product[3]}</td>
                  <td>
                    <span
                      className={`admin-status ${product[4]
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {product[4]}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="admin-icon-button"
                      aria-label={`View ${product[0]}`}
                      onClick={() => navigate(`/admin/products/${product[0].toLowerCase().replace(/[^a-z0-9]+/g, "-")}`)}
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
