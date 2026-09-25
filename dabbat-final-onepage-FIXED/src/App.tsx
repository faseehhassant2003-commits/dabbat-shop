import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";

// Admin
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminCustomers from "./admin/AdminCustomers";
import AdminInventory from "./admin/AdminInventory";
import AdminProductNew from "./admin/AdminProductNew";
import AdminOrderDetail from "./admin/AdminOrderDetail";
import AdminCustomerDetail from "./admin/AdminCustomerDetail";
import AdminProductDetail from "./admin/AdminProductDetail";
import AdminSiteImages from "./admin/AdminSiteImages";

function App() {
  return (
    <div className="app-shell">
      <Routes>
        {/* Customer Website */}
        <Route
          path="/*"
          element={
            <>
              <Header />

              <main className="site-main">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:slug" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Auth />} />
                  <Route path="/register" element={<Auth />} />
                </Routes>
              </main>

              <Footer />
            </>
          }
        />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductNew />} />
          <Route path="products/:productSlug" element={<AdminProductDetail />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:orderId" element={<AdminOrderDetail />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="customers/:customerSlug" element={<AdminCustomerDetail />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="site-images" element={<AdminSiteImages />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;