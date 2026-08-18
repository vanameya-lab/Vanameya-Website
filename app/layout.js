import { Manrope, Playfair_Display } from "next/font/google";
import Loader from "@/components/Loader";
import { CartProvider } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://www.vanameya.com'),
  title: "Vanaméya | Luxury Brand Experience",
  description: "Modern Luxury Heritage for a premium Kerala-origin lifestyle brand.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Vanaméya | Luxury Brand Experience",
    description: "Modern Luxury Heritage for a premium Kerala-origin lifestyle brand.",
    url: 'https://www.vanameya.com',
    siteName: 'Vanaméya',
    images: [
      {
        url: '/ourstoryimage.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vanaméya | Luxury Brand Experience",
    description: "Modern Luxury Heritage for a premium Kerala-origin lifestyle brand.",
    images: ['/ourstoryimage.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} h-full antialiased overflow-x-clip w-full`}
    >
      <body className="min-h-full flex flex-col font-body bg-background text-primary-text overflow-x-clip w-full max-w-full">
        <JsonLd data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://www.vanameya.com/#organization",
              "name": "VANAMÉYA",
              "url": "https://www.vanameya.com",
              "logo": "https://www.vanameya.com/icon2.png"
            },
            {
              "@type": "WebSite",
              "@id": "https://www.vanameya.com/#website",
              "url": "https://www.vanameya.com",
              "name": "VANAMÉYA",
              "publisher": {
                "@id": "https://www.vanameya.com/#organization"
              }
            }
          ]
        }} />
        <CartProvider>
          <Loader>
            <div className="w-full max-w-full overflow-x-clip">
              {children}
            </div>
            <CartDrawer />
          </Loader>
        </CartProvider>
      </body>
    </html>
  );
}
