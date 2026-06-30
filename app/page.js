import Header from "@/components/Header";
import GlobalVideoBackground from "@/components/GlobalVideoBackground";
import Hero from "@/components/Hero";
import TheModernRitual from "@/components/TheModernRitual";
import WhyChukkuKaapi from "@/components/WhyChukkuKaapi";
import BrandStory from "@/components/BrandStory";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="main-scroll-container" className="w-full min-h-screen flex flex-col items-center bg-transparent">
      <GlobalVideoBackground />
      <Header />
      <Hero />
      <TheModernRitual />
      <WhyChukkuKaapi />
      <BrandStory />
      <Footer />
    </main>
  );
}
