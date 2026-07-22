import { getFulfillmentQueueAction } from "../actions";
import FulfillmentClient from "./FulfillmentClient";

export default async function FulfillmentQueuePage() {
  const initialQueue = await getFulfillmentQueueAction();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-semibold text-primary-text mb-2">Fulfillment Queue</h1>
        <p className="text-secondary-text">Action-oriented view of orders needing processing.</p>
      </div>

      <FulfillmentClient initialQueue={initialQueue || []} />
    </div>
  );
}
