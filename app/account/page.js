import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Account() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center pt-24">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="type-h1 text-primary-text mb-4">My Account</h1>
        <p className="type-body-lg text-secondary-text mb-8">
          Manage your orders, subscriptions, and addresses.
        </p>
        <span className="px-4 py-2 bg-secondary-container type-label rounded-full">Coming Soon</span>
      </div>
      <Footer />
    </main>
  );
}
