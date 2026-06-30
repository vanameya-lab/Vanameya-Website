import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata = {
  title: "Terms & Conditions | VANAMÉYA",
  description: "Terms and conditions for accessing and using the VANAMÉYA website.",
};

export default function TermsAndConditions() {
  return (
    <LegalPageLayout title="Terms & Conditions" lastUpdated="January 1, 2026">
      <p>
        Welcome to VANAMÉYA. By accessing or using our website, you agree to be bound by the following terms and conditions. Please read them carefully before using our services or making a purchase.
      </p>

      <h2>1. General Agreement</h2>
      <p>
        These Terms & Conditions constitute a legally binding agreement made between you and VANAMÉYA concerning your access to and use of our website. If you do not agree with all of these terms, you are expressly prohibited from using the site and must discontinue use immediately.
      </p>

      <h2>2. Products & Pricing</h2>
      <ul>
        <li><strong>Product Representation:</strong> Product descriptions and images are for representation purposes and may vary slightly from the actual physical product due to the organic nature of our ingredients and artisanal packaging.</li>
        <li><strong>Pricing:</strong> All prices are listed in Indian Rupees (INR) and are subject to change without prior notice. The price charged will be the price at the time the order is placed.</li>
        <li><strong>Availability:</strong> All orders are subject to acceptance and product availability. We reserve the right to discontinue any product at any time.</li>
      </ul>

      <h2>3. Orders & Cancellations</h2>
      <p>
        VANAMÉYA reserves the right to refuse or cancel any order for any reason, including but not limited to suspicions of fraud, unauthorized or illegal transactions, or pricing errors. In such events, we will notify you and issue a refund if payment has already been processed.
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        All content on this website, including but not limited to the VANAMÉYA brand name, logo, images, text, graphics, and overall design, is the exclusive property of VANAMÉYA and is protected by copyright and intellectual property laws. Unauthorized use, reproduction, or distribution is strictly prohibited.
      </p>

      <h2>5. Payments & Future Integrations</h2>
      <p>
        While our current platform may process limited direct orders, we will be integrating robust third-party payment gateways in the future. All payment transactions will be subject to the terms and privacy policies of the respective payment processors.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, VANAMÉYA shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our website or products. Our total liability shall not exceed the total amount paid by you for the specific product in question.
      </p>

      <h2>7. Governing Law</h2>
      <p>
        These Terms & Conditions and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in <strong>Kannur, Kerala, India</strong>.
      </p>

      <h2>8. Contact Information</h2>
      <p>
        If you have any questions or concerns regarding these terms, please contact us at:
      </p>
      <ul>
        <li><strong>Email:</strong> [Support Email]</li>
        <li><strong>Phone:</strong> [Phone Number]</li>
        <li><strong>Address:</strong> [Business Address], Kannur, Kerala, India</li>
        <li><strong>FSSAI License:</strong> [FSSAI License Number]</li>
        <li><strong>GSTIN:</strong> [GST Number]</li>
      </ul>
    </LegalPageLayout>
  );
}
