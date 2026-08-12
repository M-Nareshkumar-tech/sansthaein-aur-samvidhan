import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/hooks/useI18n";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-geist-sans", // map to Tailwind theme font variable
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sansthaein Aur Samvidhan - Institutions & Constitution",
  description: "A gamified web application prototype simplifying the Constitution of India from an Institutional Perspective (Legislature, Executive, Judiciary).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full`}>
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground antialiased selection:bg-saffron/30 selection:text-white">
        <I18nProvider>
          <AuthProvider>
            {/* Animated Ambient background elements */}
            <div className="ambient-bg">
              <div className="ambient-glow-1" />
              <div className="ambient-glow-2" />
              <div className="ambient-glow-3" />
            </div>

            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
              {children}
            </main>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
