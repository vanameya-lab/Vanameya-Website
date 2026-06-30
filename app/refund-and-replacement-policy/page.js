import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata = {
  title: "Refund & Replacement Policy | VANAMÉYA",
  description: "Refund and replacement guidelines for VANAMÉYA products.",
};

export default function RefundAndReplacementPolicy() {
  return (
    <LegalPageLayout title="Refund & Replacement Policy" lastUpdated="January 1, 2026">
      <p>
        At VANAMÉYA, we maintain the highest standards of quality and hygiene. Because our products are premium, perishable food and wellness items, we have a strict policy regarding returns and refunds.
      </p>

      <h2>1. All Sales Are Final</h2>
      <p>
        Due to the perishable nature of our botanical and food products, <strong>all sales are final</strong>. Once a successful delivery has been made, we cannot accept returns, nor can we process refunds for orders.
      </p>

      <h2>2. Damaged Products & Replacements</h2>
      <p>
        We take immense care in packaging your order securely. However, if your product arrives damaged or tampered with during transit, we are here to help. Replacements are exclusively available for products that are received in a damaged condition.
      </p>

      <h2>3. How to Claim a Replacement</h2>
      <p>
        To be eligible for a replacement, you must strictly adhere to the following guidelines:
      </p>
      <ul>
        <li><strong>Time Frame:</strong> You must report the damage to us within <strong>24 hours of delivery</strong>.</li>
        <li><strong>Unboxing Video:</strong> You must provide a complete, continuous, and unedited unboxing video. The video must clearly show the fully sealed package being opened for the first time, and clearly display the damage to the product.</li>
      </ul>
      <p>
        <em>Note: Claims submitted without a valid unboxing video, or reported after 24 hours of delivery, will be rejected.</em>
      </p>

      <h2>4. Resolution Process</h2>
      <p>
        Once you submit your claim and unboxing video to our support team at <strong>[Support Email]</strong>, we will verify the details. Upon successful verification of the damage, VANAMÉYA will, at its sole discretion, offer one of the following:
      </p>
      <ul>
        <li>A free replacement of the damaged product.</li>
        <li>Store credit equivalent to the value of the damaged item.</li>
      </ul>
      <p>
        Under no circumstances will cash refunds be provided.
      </p>

      <h2>5. Contact Support</h2>
      <p>
        To initiate a damage claim, please reach out to us immediately at:
      </p>
      <ul>
        <li><strong>Email:</strong> [Support Email]</li>
        <li><strong>Phone:</strong> [Phone Number]</li>
      </ul>
      <p>Please include your Order ID and the unboxing video in your initial communication.</p>
    </LegalPageLayout>
  );
}
