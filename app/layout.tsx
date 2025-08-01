import type { Metadata } from "next";
import "./globals.css";

import { Manrope } from "next/font/google";

// Lexend Font
const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobAI - AI-Powered Job Search",
  description: "Find your dream job with AI-powered job search and matching",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.className}>
      <body className="dark antialiased">{children}</body>
    </html>
  );
}
