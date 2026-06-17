import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrandStory from "@/components/BrandStory";

export default function Story() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center pt-24">
      <Header />
      <div className="w-full max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-display-lg text-primary mb-6">Our Origin Story</h1>
        <p className="text-body-lg text-on-surface-variant">
          Discover the roots of Vanaméya and our dedication to heritage.
        </p>
      </div>
      <BrandStory />
      <Footer />
    </main>
  );
}
