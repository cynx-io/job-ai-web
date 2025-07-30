import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
