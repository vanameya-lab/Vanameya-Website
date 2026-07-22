import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import LogoutButton from "./LogoutButton";

export default function AdminLayout({ children }) {
  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Fulfillment Queue", path: "/admin/fulfillment" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Customers", path: "/admin/customers" },
    { name: "Products", path: "/admin/products" },
    { name: "Payments", path: "/admin/payments" },
    { name: "Reviews", path: "/admin/reviews" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden text-primary-text font-body print:bg-white print:h-auto print:overflow-visible">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border/20 flex flex-col hidden md:flex shrink-0 print:hidden">
        <div className="p-6 border-b border-border/20">
          <Link href="/" className="text-xl font-heading font-semibold text-accent tracking-widest">
            VANAMÉYA
          </Link>
          <p className="text-xs text-secondary-text mt-1 uppercase tracking-widest">Admin</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col gap-1 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="flex items-center px-4 py-3 rounded-lg text-sm font-semibold hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-6 border-t border-border/20 text-xs text-secondary-text">
          <p>Logged in as Admin</p>
          <Link href="/" className="text-accent underline mt-2 block">Storefront ↗</Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden print:overflow-visible print:h-auto">
        {/* Mobile Header */}
        <header className="md:hidden bg-surface border-b border-border/20 p-4 flex items-center justify-between shrink-0 print:hidden">
          <Link href="/admin" className="text-lg font-heading font-semibold text-accent">
            VANAMÉYA Admin
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-accent underline">Storefront</Link>
            <LogoutButton />
          </div>
        </header>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 hide-scrollbar print:overflow-visible print:p-0">
          <div className="max-w-6xl mx-auto print:max-w-none">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
