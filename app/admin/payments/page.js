import { getPaymentsAction } from "../actions";
import PaymentsClient from "./PaymentsClient";

export default async function AdminPaymentsPage() {
  const initialData = await getPaymentsAction({ page: 1, limit: 20 });

  return <PaymentsClient initialData={initialData} />;
}

