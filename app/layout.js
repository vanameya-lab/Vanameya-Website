import { Inter, Playfair_Display } from "next/font/google";
import Loader from "@/components/Loader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Vanaméya | Luxury Brand Experience",
  description: "Modern Luxury Heritage for a premium Kerala-origin lifestyle brand.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-surface text-on-surface">
        <Loader>
          {children}
        </Loader>
      </body>
    </html>
  );
}
