"use server";

import { adminOrderService } from "@/services/admin.order.service";
import { adminCustomerService } from "@/services/admin.customer.service";
import { adminPaymentService } from "@/services/admin.payment.service";
import { adminProductService } from "@/services/admin.product.service";
import { adminSettingsService } from "@/services/admin.settings.service";
import { adminReviewService } from "@/services/admin.review.service";
import { revalidatePath } from "next/cache";

// --- Orders ---
export async function getOrdersAction(params) {
  return await adminOrderService.getOrders(params);
}

export async function getFulfillmentQueueAction() {
  return await adminOrderService.getFulfillmentQueue();
}

export async function getOrderByIdAction(id) {
  return await adminOrderService.getOrderById(id);
}

export async function updateOrderStatusAction(orderId, newStatus, eventNote) {
  const result = await adminOrderService.updateOrderStatus(orderId, newStatus, eventNote);
  revalidatePath('/admin');
  revalidatePath('/admin/orders');
  revalidatePath('/admin/fulfillment');
  return result;
}

export async function deleteOrderAction(orderId) {
  const result = await adminOrderService.deleteOrder(orderId);
  revalidatePath('/admin');
  revalidatePath('/admin/orders');
  revalidatePath('/admin/fulfillment');
  return result;
}

// --- Customers ---
export async function getCustomersAction(params) {
  return await adminCustomerService.getCustomers(params);
}

export async function getCustomerByIdAction(id) {
  return await adminCustomerService.getCustomerById(id);
}

export async function updateCustomerAction(id, updates) {
  const result = await adminCustomerService.updateCustomer(id, updates);
  revalidatePath('/admin/orders');
  revalidatePath('/admin/orders/[id]');
  return result;
}

// --- Payments ---
export async function getPaymentsAction(params) {
  return await adminPaymentService.getPayments(params);
}

export async function getPaymentByIdAction(id) {
  return await adminPaymentService.getPaymentById(id);
}

// --- Products ---
export async function getProductAction() {
  return await adminProductService.getProduct();
}

export async function updateProductAction(id, updates) {
  const result = await adminProductService.updateProduct(id, updates);
  revalidatePath('/admin/products');
  return result;
}

// --- Settings ---
export async function getSettingsAction() {
  return await adminSettingsService.getSettings();
}

export async function updateSettingsAction(id, updates) {
  const result = await adminSettingsService.updateSettings(id, updates);
  revalidatePath('/admin/settings');
  return result;
}

// --- Reviews ---
export async function getAllReviewsAction(params) {
  return await adminReviewService.getAllReviews(params);
}

export async function updateReviewStatusAction(id, approved) {
  const result = await adminReviewService.updateReviewStatus(id, approved);
  revalidatePath('/admin/reviews');
  revalidatePath('/'); // Review visibility on storefront
  return result;
}

export async function deleteReviewAction(id) {
  const result = await adminReviewService.deleteReview(id);
  revalidatePath('/admin/reviews');
  revalidatePath('/');
  return result;
}
