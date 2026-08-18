import Header from "@/components/Header";
import ProductHero from "@/components/ProductHero";
import CraftedWithPurposeProduct from "@/components/CraftedWithPurposeProduct";
import WhenToEnjoy from "@/components/WhenToEnjoy";
import WhyChooseVanameya from "@/components/WhyChooseVanameya";

import ProductFAQ from "@/components/ProductFAQ";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Instant Dry Ginger Coffee | VANAMÉYA",
  description: "Experience the premium conversion-focused Chukku Kaapi. A daily wellness ritual rooted in Kerala tradition with organic spices and unrefined palm jaggery.",
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: "Instant Dry Ginger Coffee | VANAMÉYA",
    description: "Experience the premium conversion-focused Chukku Kaapi. A daily wellness ritual rooted in Kerala tradition with organic spices and unrefined palm jaggery.",
    url: 'https://www.vanameya.com/shop',
    images: ['/products/dry-ginger-coffee/pack.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Instant Dry Ginger Coffee | VANAMÉYA",
    description: "Experience the premium conversion-focused Chukku Kaapi. A daily wellness ritual rooted in Kerala tradition with organic spices and unrefined palm jaggery.",
    images: ['/products/dry-ginger-coffee/pack.png'],
  },
};

export default function Shop() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-surface">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Product",
            "name": "Instant Dry Ginger Coffee",
            "image": "https://www.vanameya.com/products/dry-ginger-coffee/pack.png",
            "description": "Experience the premium conversion-focused Chukku Kaapi. A daily wellness ritual rooted in Kerala tradition with organic spices and unrefined palm jaggery.",
            "brand": {
              "@type": "Brand",
              "name": "VANAMÉYA"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://www.vanameya.com/shop",
              "priceCurrency": "INR",
              "price": "149",
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }
        ]
      }} />
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


      {/* 11. FAQ Accordions */}
      <ProductFAQ />

      {/* 12. Brand Footer */}
      <Footer />
    </main>
  );
}

