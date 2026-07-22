import { createAdminClient } from "@/lib/supabase/admin";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboard() {
  const supabase = createAdminClient();

  // Fetch initial Data for SSR
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*, customers(full_name)')
    .order('created_at', { ascending: false })
    .limit(50); // Get enough for metrics

  if (ordersError) {
    console.error("Dashboard Error:", ordersError);
    return <div>Error loading dashboard.</div>;
  }

  return <DashboardClient initialOrders={orders} />;
}

