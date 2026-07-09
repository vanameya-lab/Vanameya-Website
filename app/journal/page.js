import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Journal() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center pt-24">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="type-h1 text-primary-text mb-4">The Journal</h1>
        <p className="type-body-lg text-secondary-text mb-8">
          Stories of wellness, heritage, and the modern lifestyle.
        </p>
        <span className="px-4 py-2 bg-secondary-container type-label rounded-full">Coming Soon</span>
      </div>
      <Footer />
    </main>
  );
}
