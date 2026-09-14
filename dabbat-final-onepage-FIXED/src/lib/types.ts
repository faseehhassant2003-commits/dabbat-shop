export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  images: string[];
  description: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}
