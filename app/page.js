import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TheModernRitual from "@/components/TheModernRitual";
import ScrollAnimationSection from "@/components/ScrollAnimationSection";
import WhyChukkuKaapi from "@/components/WhyChukkuKaapi";
import CraftedWithPurpose from "@/components/CraftedWithPurpose";
import Preparation from "@/components/Preparation";
import BrandStory from "@/components/BrandStory";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <Hero />
      <ScrollAnimationSection />
      <TheModernRitual />
      <WhyChukkuKaapi />
      <CraftedWithPurpose />
      <Preparation />
      <BrandStory />
      <Reviews />
      <CTA />
      <Footer />
    </main>
  );
}
