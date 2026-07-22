import { getOrdersAction } from "../actions";
import OrdersClient from "./OrdersClient";

export default async function AdminOrdersPage() {
  const initialData = await getOrdersAction({ page: 1, limit: 20 });

  return <OrdersClient initialData={initialData} />;
}

