import type { Product } from "./types";

export const mockProducts: Product[] = [
  {
    id: 1, name: "Oxford Shirt", slug: "oxford-shirt", price: 1799, category: "Shirts",
    sizes: ["S","M","L","XL"], colors: ["Black","Stone","Navy"], images: ["/images/product-black.svg"],
    description: "A crisp cotton oxford with a structured collar and relaxed modern fit.", inStock: true,
  },
  {
    id: 2, name: "Classic Shirt", slug: "classic-shirt", price: 1699, category: "Shirts",
    sizes: ["S","M","L","XL"], colors: ["White","Stone","Navy"], images: ["/images/product-white.svg"],
    description: "A clean everyday shirt cut from smooth cotton with an understated finish.", inStock: true,
  },
  {
    id: 3, name: "Linen Shirt", slug: "linen-shirt", price: 1899, category: "Shirts",
    sizes: ["S","M","L","XL"], colors: ["Navy","White"], images: ["/images/product-navy.svg"],
    description: "Lightweight linen with a refined silhouette for warm-weather dressing.", inStock: true,
  },
  {
    id: 4, name: "Tailored Trousers", slug: "tailored-trousers", price: 2299, category: "Trousers",
    sizes: ["30","32","34","36"], colors: ["Charcoal","Navy","Black"], images: ["/images/product-trouser.svg"],
    description: "Tailored trousers with a clean front and softly tapered leg.", inStock: true,
  },
  {
    id: 5, name: "Relaxed Trousers", slug: "relaxed-trousers", price: 1999, category: "Trousers",
    sizes: ["30","32","34","36"], colors: ["Stone","Charcoal"], images: ["/images/product-stone-trouser.svg"],
    description: "A relaxed trouser built for effortless everyday styling.", inStock: true,
  },
];
