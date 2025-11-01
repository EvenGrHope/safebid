import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Safebid - sammenlign forsikringstilbud",
  description: "Få forsikringstilbud fra flere rådgivere - på en gang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray50 text-gray-900`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
