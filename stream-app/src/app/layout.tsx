import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StreamNow — Watch TV & Movies Online",
  description: "Stream the latest TV shows and movies on demand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased bg-[#0a0a0f] text-white`}>
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-[#1f1f2e] mt-16 py-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} StreamNow. For demo purposes only.
        </footer>
      </body>
    </html>
  );
}
