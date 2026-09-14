import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Boxes,
  LogOut,
  Menu,
  X
} from "lucide-react";
import "./admin.css";

export default function AdminLayout() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const links = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/products", label: "Products", icon: Package },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { to: "/admin/customers", label: "Customers", icon: Users },
    { to: "/admin/inventory", label: "Inventory", icon: Boxes }
  ];

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <div className="admin-brand">
          <div className="admin-logo">DABBAT</div>
          <div className="admin-label">ADMINISTRATION</div>
        </div>

        <nav className="admin-nav">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} strokeWidth={1.6} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <button className="admin-logout" onClick={() => navigate("/login")}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {open && (
        <div
          className="admin-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <main className="admin-main">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div>
            <div className="admin-top-title">Dabbat Admin</div>
            <div className="admin-top-subtitle">
              Store management
            </div>
          </div>

          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <small>Admin account</small>
            </div>
          </div>
        </header>

        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
