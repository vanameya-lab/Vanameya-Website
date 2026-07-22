import { getCustomersAction } from "../actions";
import CustomersClient from "./CustomersClient";

export default async function AdminCustomersPage() {
  const initialData = await getCustomersAction({ page: 1, limit: 20 });

  return <CustomersClient initialData={initialData} />;
}

