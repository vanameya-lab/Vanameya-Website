import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata = {
  title: "Shipping Policy | VANAMÉYA",
  description: "Information regarding shipping and delivery times for VANAMÉYA products.",
};

export default function ShippingPolicy() {
  return (
    <LegalPageLayout title="Shipping Policy" lastUpdated="January 1, 2026">
      <p>
        We are thrilled to bring the authentic wellness of Kerala directly to your doorstep. Please review our shipping practices below to understand how your VANAMÉYA products will be delivered.
      </p>

      <h2>1. Shipping Coverage</h2>
      <p>
        We currently ship our premium products <strong>across India</strong>. We partner with reliable courier services to ensure your package arrives safely.
      </p>

      <h2>2. Order Processing Time</h2>
      <p>
        Quality cannot be rushed. All orders are carefully prepared and dispatched within <strong>1 to 3 business days</strong> from the time of order confirmation. You will receive a notification once your package has left our facility.
      </p>

      <h2>3. Estimated Delivery Time</h2>
      <p>
        Once dispatched, the estimated delivery time is between <strong>5 to 12 business days</strong>, depending on your location within India. 
      </p>

      <h2>4. Order Tracking</h2>
      <p>
        As soon as your order is handed over to our courier partner, we will provide you with tracking details via email or SMS. You can use this information to monitor the progress of your delivery.
      </p>

      <h2>5. Delivery Delays</h2>
      <p>
        While we strive to ensure timely delivery, occasional delays may occur due to circumstances beyond our control. These include, but are not limited to:
      </p>
      <ul>
        <li>Unexpected courier logistics issues.</li>
        <li>Severe weather conditions or natural disasters.</li>
        <li>Public holidays and regional festivals.</li>
        <li>Deliveries to extremely remote or difficult-to-access locations.</li>
      </ul>
      <p>
        Please note that VANAMÉYA is not liable for courier delays that fall outside our direct control, but we will always assist you in communicating with the delivery partner to resolve the issue.
      </p>

      <h2>6. Need Assistance?</h2>
      <p>
        If your order is significantly delayed or you are facing issues with your tracking number, please contact us at <strong>[Support Email]</strong> or <strong>[Phone Number]</strong> so we can investigate on your behalf.
      </p>
    </LegalPageLayout>
  );
}
