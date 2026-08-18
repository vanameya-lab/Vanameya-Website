import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductFAQ from "@/components/ProductFAQ";
import JsonLd from "@/components/JsonLd";

// New Premium PDP Components
import PDPGallery from "@/components/pdp/PDPGallery";
import PDPPurchasePanel from "@/components/pdp/PDPPurchasePanel";
import PDPBenefits from "@/components/pdp/PDPBenefits";
import PDPPreparationTimeline from "@/components/pdp/PDPPreparationTimeline";
import PDPNutritionSpecs from "@/components/pdp/PDPNutritionSpecs";
import PDPReviews from "@/components/pdp/PDPReviews";
import PDPRelatedProducts from "@/components/pdp/PDPRelatedProducts";

export const metadata = {
  title: "Shop Now - Instant Dry Ginger Coffee | VANAMÉYA",
  description: "Experience the premium Dry Ginger Coffee. A daily wellness ritual rooted in Kerala tradition. 100% natural, no refined sugar, ready in seconds.",
  alternates: {
    canonical: '/shop-now',
  },
  openGraph: {
    title: "Shop Now - Instant Dry Ginger Coffee | VANAMÉYA",
    description: "Experience the premium Dry Ginger Coffee. A daily wellness ritual rooted in Kerala tradition. 100% natural, no refined sugar, ready in seconds.",
    url: 'https://www.vanameya.com/shop-now',
    images: ['/products/dry-ginger-coffee/pack.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Shop Now - Instant Dry Ginger Coffee | VANAMÉYA",
    description: "Experience the premium Dry Ginger Coffee. A daily wellness ritual rooted in Kerala tradition. 100% natural, no refined sugar, ready in seconds.",
    images: ['/products/dry-ginger-coffee/pack.png'],
  },
};

export default function ShopNow() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-surface relative">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Product",
            "name": "Instant Dry Ginger Coffee",
            "image": "https://www.vanameya.com/products/dry-ginger-coffee/pack.png",
            "description": "Experience the premium Dry Ginger Coffee. A daily wellness ritual rooted in Kerala tradition. 100% natural, no refined sugar, ready in seconds.",
            "brand": {
              "@type": "Brand",
              "name": "VANAMÉYA"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://www.vanameya.com/shop-now",
              "priceCurrency": "INR",
              "price": "149",
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition"
            }
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What are the benefits of Dry Ginger Coffee?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dry Ginger Coffee (Chukku Kaapi) helps in digestion, soothes throat infections, and provides natural warmth and energy without the crash of regular caffeine."
                }
              },
              {
                "@type": "Question",
                "name": "Is it 100% natural?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our Instant Dry Ginger Coffee is made with 100% natural ingredients, including organic spices and pure palm jaggery, with zero refined sugar."
                }
              }
            ]
          }
        ]
      }} />
      <Header />

      {/* Hero Section: Two Column Sticky Layout for Desktop */}
      <section className="w-full pt-24 pb-12 px-4 md:px-8 bg-surface relative z-10 overflow-hidden md:overflow-visible">
        <div className="max-w-container-max mx-auto">
          <div className="grid lg:grid-cols-12 gap-4 lg:gap-20 items-start">
            
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
      
      {/* Reviews & Social Proof */}
      <PDPReviews />

      <PDPPreparationTimeline />
      <PDPNutritionSpecs />
      
      {/* Upsells */}
      {/* 
        TODO (Reminder): Uncomment this PDPRelatedProducts section after a few days or months 
        as per the user's request.
        <PDPRelatedProducts />
      */}

      {/* FAQ */}
      <ProductFAQ />

      <Footer />

    </main>
  );
}
