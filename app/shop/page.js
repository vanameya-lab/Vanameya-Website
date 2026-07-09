import Header from "@/components/Header";
import ProductHero from "@/components/ProductHero";
import CraftedWithPurposeProduct from "@/components/CraftedWithPurposeProduct";
import WhenToEnjoy from "@/components/WhenToEnjoy";
import WhyChooseVanameya from "@/components/WhyChooseVanameya";
import ProductReviews from "@/components/ProductReviews";
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
      {/* 5. Crafted With Purpose Ingredients */}
      <CraftedWithPurposeProduct />

      {/* 6. When to Enjoy Ritual Grid */}
      <WhenToEnjoy />

      {/* 8. Why Choose VANAMÉYA Brand Pillars */}
      <WhyChooseVanameya />

      {/* 9. Verified Customer Reviews */}
      <ProductReviews />

      {/* 11. FAQ Accordions */}
      <ProductFAQ />

      {/* 12. Brand Footer */}
      <Footer />
    </main>
  );
}

