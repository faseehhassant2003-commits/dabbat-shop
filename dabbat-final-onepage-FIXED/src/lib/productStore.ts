import { mockProducts } from "./mockData";
import type { Product } from "./types";

export const PRODUCTS_STORAGE_KEY = "dabbat-products";

function readSavedProducts(): Product[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = window.localStorage.getItem(PRODUCTS_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed.filter(isProduct) : [];
  } catch {
    return [];
  }
}

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false;
  const product = value as Partial<Product>;
  return typeof product.id === "number" && typeof product.name === "string" &&
    typeof product.category === "string" && Array.isArray(product.images);
}

export function getProducts(): Product[] {
  return [...mockProducts, ...readSavedProducts()];
}

export function saveProduct(product: Product): void {
  const saved = readSavedProducts().filter((item) => item.id !== product.id);
  window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify([...saved, product]));
  window.dispatchEvent(new CustomEvent("dabbat-products-updated"));
}
