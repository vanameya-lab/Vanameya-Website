import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductFAQ from "@/components/ProductFAQ";

// New Premium PDP Components
import PDPGallery from "@/components/pdp/PDPGallery";
import PDPPurchasePanel from "@/components/pdp/PDPPurchasePanel";
import PDPStickyMobileBar from "@/components/pdp/PDPStickyMobileBar";
import PDPBenefits from "@/components/pdp/PDPBenefits";
import PDPIngredients from "@/components/pdp/PDPIngredients";
import PDPPreparationTimeline from "@/components/pdp/PDPPreparationTimeline";
import PDPWhyVanameya from "@/components/pdp/PDPWhyVanameya";
import PDPNutritionSpecs from "@/components/pdp/PDPNutritionSpecs";
import PDPReviews from "@/components/pdp/PDPReviews";
import PDPRelatedProducts from "@/components/pdp/PDPRelatedProducts";

export const metadata = {
  title: "Shop Now - Instant Dry Ginger Coffee | VANAMÉYA",
  description: "Experience the premium Dry Ginger Coffee. A daily wellness ritual rooted in Kerala tradition. 100% natural, no refined sugar, ready in seconds.",
};

export default function ShopNow() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-surface relative">
      <Header />

      {/* Hero Section: Two Column Sticky Layout for Desktop */}
      <section className="w-full pt-24 pb-12 px-4 md:px-8 bg-surface relative z-10 overflow-hidden md:overflow-visible">
        <div className="max-w-container-max mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left: Product Gallery */}
            <div className="lg:col-span-7 w-full h-full min-w-0">
              <PDPGallery />
            </div>

            {/* Right: Sticky Purchase Panel */}
            <div className="lg:col-span-5 w-full min-w-0">
              <PDPPurchasePanel />
            </div>

          </div>
        </div>
      </section>

      {/* Storytelling & Info Sections Below Fold */}
      <PDPBenefits />
      <PDPIngredients />
      <PDPPreparationTimeline />
      <PDPWhyVanameya />
      <PDPNutritionSpecs />
      
      {/* Reviews & Social Proof */}
      <PDPReviews />
      
      {/* Upsells */}
      <PDPRelatedProducts />

      {/* FAQ */}
      <div className="w-full max-w-container-max mx-auto border-t border-border/50 py-12">
         <ProductFAQ />
      </div>

      <Footer />

      {/* Mobile Sticky Buy Bar */}
      <PDPStickyMobileBar />
      
    </main>
  );
}
