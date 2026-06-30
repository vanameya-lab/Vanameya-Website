import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata = {
  title: "Privacy Policy | VANAMÉYA",
  description: "Privacy policy detailing how VANAMÉYA collects and protects your information.",
};

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="January 1, 2026">
      <p>
        At VANAMÉYA, we deeply value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        When you interact with our website or place an order, we may collect the following information:
      </p>
      <ul>
        <li><strong>Personal Identifiers:</strong> Name, email address, and phone number.</li>
        <li><strong>Shipping Information:</strong> Billing and delivery address.</li>
        <li><strong>Order Details:</strong> History of products purchased and transaction details.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>
        The information we collect is strictly used to provide a premium and seamless experience. Specifically, we use it for:
      </p>
      <ul>
        <li>Processing your orders and ensuring accurate, timely shipping.</li>
        <li>Providing customer support and responding to your inquiries.</li>
        <li>Communicating important updates regarding your order status.</li>
        <li>Sending occasional promotional communications (which you can opt out of at any time).</li>
      </ul>

      <h2>3. Payment Security</h2>
      <p>
        We do not store your credit card or payment details on our servers. All transactions are securely processed through trusted third-party payment gateways that adhere to strict industry standards for encryption and security.
      </p>

      <h2>4. Cookies and Analytics</h2>
      <p>
        Our website utilizes cookies and similar tracking tools to enhance your browsing experience, analyze site traffic, and understand customer preferences. You can adjust your browser settings to decline cookies, though this may limit your ability to use certain features of our website.
      </p>

      <h2>5. Data Protection & Third Parties</h2>
      <p>
        Your personal data is an essential part of our relationship. <strong>We will never sell, rent, or trade your personal information to third parties.</strong> Information is only shared with trusted partners (such as courier services) solely for the purpose of fulfilling your order.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You have the right to access, correct, or request the deletion of your personal information held by us. If you wish to exercise any of these rights, please contact our support team.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy or how your data is handled, please reach out to us at:
      </p>
      <ul>
        <li><strong>Email:</strong> [Support Email]</li>
        <li><strong>Address:</strong> [Business Address], Kannur, Kerala, India</li>
      </ul>
    </LegalPageLayout>
  );
}
