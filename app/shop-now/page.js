import Header from "@/components/Header";
import ShopNowPurchase from "@/components/ShopNowPurchase";
import HowToPrepare from "@/components/HowToPrepare";
import ProductReviews from "@/components/ProductReviews";
import ProductFAQ from "@/components/ProductFAQ";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Shop Instant Dry Ginger Coffee | VANAMÉYA",
  description: "Experience the premium conversion-focused Chukku Kaapi. A daily wellness ritual rooted in Kerala tradition with organic spices and unrefined palm jaggery.",
};

export default function ShopNow() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-surface">
      <Header />

      {/* High Converting Product Hero / Buy Box */}
      <ShopNowPurchase />

      {/* Social Proof */}
      <ProductReviews />

      {/* How to use */}
      <HowToPrepare />

      {/* FAQs to overcome objections */}
      <ProductFAQ />

      <Footer />
    </main>
  );
}
