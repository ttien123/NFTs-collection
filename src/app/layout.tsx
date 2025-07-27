import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import WalletProvider from "@/Providers/WalletProvider/WalletProvider";
import { headers } from "next/headers";
import HeaderMainLayout from "@/components/HeaderMainLayout";
import NextTopLoader from "nextjs-toploader";
import ScrollToTop from "@/components/ScrollToTop";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: '%s | NFTs Market Place',
    default: 'NFTs Market Place | Tiến Nguyễn',
  },
  description: 'Explore and collect unique NFTs from various collections. Buy, sell, and trade digital assets with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = headers().get("cookie");
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader showSpinner={false} color="#e5e7eb" />
        <WalletProvider cookie={cookie}>
          <ScrollToTop />
          <HeaderMainLayout />
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
