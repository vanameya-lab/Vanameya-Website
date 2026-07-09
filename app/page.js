import fs from "fs";
import path from "path";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import TheModernRitual from "@/components/TheModernRitual";
import WhyChukkuKaapi from "@/components/WhyChukkuKaapi";
import WhenToEnjoy from "@/components/WhenToEnjoy";
import Preparation from "@/components/Preparation";
import Footer from "@/components/Footer";

export default function Home() {
  const heroScrollDir = path.join(process.cwd(), "public", "hero-scroll1");
  let framePaths = [];
  try {
    const files = fs.readdirSync(heroScrollDir);
    framePaths = files
      .filter((file) => file.match(/\.(jpg|jpeg|png|webp)$/i))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `/hero-scroll1/${file}`);
  } catch (error) {
    console.error("Error reading hero-scroll1 frames:", error);
  }

  return (
    <main id="main-scroll-container" className="w-full min-h-screen bg-background">
      <Header />
      <Hero frames={framePaths} />
      <BrandStory />
      <Footer />
    </main>
  );
}
