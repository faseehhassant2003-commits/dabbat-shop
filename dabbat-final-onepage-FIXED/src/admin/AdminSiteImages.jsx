import React from "react";
import { Link } from "react-router-dom";
import { defaultSiteImages, getSiteImages, saveSiteImages } from "../lib/siteImageStore";

const slots = [
  { key: "hero", title: "First poster / Hero", note: "The full-width image at the top of the homepage." },
  { key: "editorial", title: "Editorial poster", note: "The large editorial image below the collection." },
  { key: "shirts", title: "Shirts poster", note: "The shirts category banner." },
  { key: "trousers", title: "Trousers poster", note: "The trousers category banner." },
];

export default function AdminSiteImages() {
  const [images, setImages] = React.useState(getSiteImages);
  const [saved, setSaved] = React.useState(false);

  const updateImage = (key, value) => {
    setImages((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const handleFile = (key, event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateImage(key, String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveSiteImages(images);
    setSaved(true);
  };

  const resetImages = () => {
    setImages(defaultSiteImages);
    saveSiteImages(defaultSiteImages);
    setSaved(true);
  };

  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">STOREFRONT / VISUALS</p>
          <h1>Page images</h1>
          <p>Change the posters used across the Dabbat homepage.</p>
        </div>
        <Link className="admin-secondary-button" to="/">View storefront</Link>
      </div>

      <form className="admin-image-slots" onSubmit={handleSubmit}>
        {slots.map((slot) => (
          <section className="admin-image-slot admin-panel" key={slot.key}>
            <div className="admin-image-slot-preview">
              <img src={images[slot.key]} alt={`${slot.title} preview`} />
            </div>
            <div className="admin-image-slot-fields">
              <p className="admin-eyebrow">IMAGE SLOT</p>
              <h2>{slot.title}</h2>
              <p>{slot.note}</p>
              <label>
                <span>Image URL</span>
                <input
                  type="url"
                  value={images[slot.key].startsWith("data:") ? "" : images[slot.key]}
                  placeholder="https://..."
                  onChange={(event) => updateImage(slot.key, event.target.value)}
                />
              </label>
              <label>
                <span>Upload replacement</span>
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleFile(slot.key, event)} />
              </label>
            </div>
          </section>
        ))}

        <div className="admin-form-actions admin-image-actions">
          <button type="button" className="admin-secondary-button" onClick={resetImages}>Reset defaults</button>
          <button type="submit" className="admin-primary-button">{saved ? "Saved" : "Save page images"}</button>
        </div>
      </form>
    </div>
  );
}
