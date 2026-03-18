import type { Metadata } from "next";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { I18nProvider } from "@/i18n/I18nProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RobotX AI and Robotics Education",
  description: "Bring Latest Technology to next generation. RobotX offers Free Robot and AI courses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <Header />

          <main className="flex-grow max-w-[1800px] mx-auto">
            {children}
          </main>

          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
