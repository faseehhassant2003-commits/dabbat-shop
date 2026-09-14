import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProductNew() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/admin/products");
  };

  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">CATALOGUE / NEW ENTRY</p>
          <h1>Add product</h1>
          <p>Create a new item for the Dabbat catalogue.</p>
        </div>
        <Link className="admin-secondary-button" to="/admin/products">
          Back to products
        </Link>
      </div>

      <form className="admin-panel admin-product-form" onSubmit={handleSubmit}>
        <label>
          <span>Product name</span>
          <input name="name" placeholder="e.g. Cotton Overshirt" required />
        </label>
        <label>
          <span>Category</span>
          <select name="category" defaultValue="Shirts">
            <option>Shirts</option>
            <option>Trousers</option>
            <option>Blazers</option>
          </select>
        </label>
        <label>
          <span>Price</span>
          <input name="price" type="number" min="0" placeholder="4500" required />
        </label>
        <label>
          <span>Stock units</span>
          <input name="stock" type="number" min="0" placeholder="25" required />
        </label>
        <label>
          <span>SKU</span>
          <input name="sku" placeholder="DB-SH-001" required />
        </label>
        <label>
          <span>Available sizes</span>
          <input name="sizes" placeholder="S, M, L, XL" required />
        </label>
        <label className="admin-form-wide">
          <span>Product image URL</span>
          <input name="image" type="url" placeholder="https://..." />
        </label>
        <label className="admin-form-wide">
          <span>Upload product image</span>
          <input
            name="imageFile"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(event) => {
              const file = event.target.files?.[0];
              setImagePreview(file ? URL.createObjectURL(file) : "");
            }}
          />
          {imagePreview && (
            <img className="admin-image-preview" src={imagePreview} alt="Product preview" />
          )}
        </label>
        <label className="admin-form-wide">
          <span>Description</span>
          <textarea name="description" rows="5" placeholder="Describe the fabric, fit, and finish..." required />
        </label>
        <label>
          <span>Visibility</span>
          <select name="visibility" defaultValue="Published">
            <option>Published</option>
            <option>Draft</option>
          </select>
        </label>
        <div className="admin-form-actions">
          <Link className="admin-secondary-button" to="/admin/products">Cancel</Link>
          <button className="admin-primary-button" type="submit">Save product</button>
        </div>
      </form>
    </div>
  );
}
