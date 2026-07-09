import { Manrope, Playfair_Display } from "next/font/google";
import Loader from "@/components/Loader";
import "./globals.css";

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
  title: "Vanaméya | Luxury Brand Experience",
  description: "Modern Luxury Heritage for a premium Kerala-origin lifestyle brand.",
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
        <Loader>
          <div className="w-full max-w-full overflow-x-clip">
            {children}
          </div>
        </Loader>
      </body>
    </html>
  );
}
