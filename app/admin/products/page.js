import { getProductAction } from "../actions";
import ProductsClient from "./ProductsClient";

export default async function AdminProductsPage() {
  const products = await getProductAction();

  return <ProductsClient products={products || []} />;
}

