import Header from "@/components/Header";
import ProductHero from "@/components/ProductHero";
import WhyDryGinger from "@/components/WhyDryGinger";
import ScrollAnimationSection from "@/components/ScrollAnimationSection";
import CraftedWithPurposeProduct from "@/components/CraftedWithPurposeProduct";
import WhenToEnjoy from "@/components/WhenToEnjoy";
import HowToPrepare from "@/components/HowToPrepare";
import WhyChooseVanameya from "@/components/WhyChooseVanameya";
import ProductReviews from "@/components/ProductReviews";
import ProductPurchase from "@/components/ProductPurchase";
import ProductFAQ from "@/components/ProductFAQ";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Instant Dry Ginger Coffee | VANAMÉYA",
  description: "Experience the premium conversion-focused Chukku Kaapi. A daily wellness ritual rooted in Kerala tradition with organic spices and unrefined palm jaggery.",
};

export default function Shop() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-surface">
      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Product Hero Showcase */}
      <ProductHero />

      {/* 3. Why Dry Ginger Lifestyle Section */}
      <WhyDryGinger />

      {/* 4. Signature Scroll Animation Storytelling */}
      <ScrollAnimationSection />

      {/* 5. Crafted With Purpose Ingredients */}
      <CraftedWithPurposeProduct />

      {/* 6. When to Enjoy Ritual Grid */}
      <WhenToEnjoy />

      {/* 7. How to Prepare Steps (with Premium Icons) */}
      <HowToPrepare />

      {/* 8. Why Choose VANAMÉYA Brand Pillars */}
      <WhyChooseVanameya />

      {/* 9. Verified Customer Reviews */}
      <ProductReviews />

      {/* 10. Purchase Conversion Showcase */}
      <ProductPurchase />

      {/* 11. FAQ Accordions */}
      <ProductFAQ />

      {/* 12. Brand Footer */}
      <Footer />
    </main>
  );
}
