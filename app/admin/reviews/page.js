import { getAllReviewsAction } from "../actions";
import ReviewsClient from "./ReviewsClient";

export default async function AdminReviewsPage() {
  const initialData = await getAllReviewsAction({ page: 1, limit: 20 });

  return <ReviewsClient initialData={initialData} />;
}
