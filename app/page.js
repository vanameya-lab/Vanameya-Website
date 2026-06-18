import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TheModernRitual from "@/components/TheModernRitual";
import ScrollAnimationSection from "@/components/ScrollAnimationSection";
import WhyChukkuKaapi from "@/components/WhyChukkuKaapi";
import BrandStory from "@/components/BrandStory";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <Hero />
      <ScrollAnimationSection />
      <TheModernRitual />
      <WhyChukkuKaapi />
      <BrandStory />
      <Reviews />
      <Footer />
    </main>
  );
}
