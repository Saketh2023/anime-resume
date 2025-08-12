import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const isDevelopment = process.env.NODE_ENV === 'development';
const baseUrl = isDevelopment ? 'http://localhost:3000' : 'https://sakethkumar.dev';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Saketh Kumar | The Full-Stack Phantom | Senior Developer",
  description: "Elite phantom thief specializing in digital infiltration and code manipulation. Master of React, TypeScript, and modern web technologies. 6+ years of covert operations.",
  keywords: ["developer", "react", "typescript", "nextjs", "fullstack", "phantom thief", "senior developer"],
  authors: [{ name: "Saketh Kumar" }],
  creator: "Saketh Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sakethkumar.dev",
    title: "Saketh Kumar | The Full-Stack Phantom",
    description: "Elite phantom thief specializing in digital infiltration and code manipulation. Master of extracting valuable insights from legacy systems.",
    siteName: "Saketh Kumar - Phantom Thief Portfolio",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Phantom Thief Developer Resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saketh Kumar | The Full-Stack Phantom",
    description: "Elite phantom thief specializing in digital infiltration and code manipulation. 6+ years of covert operations.",
    creator: "@sakethcodes",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎭</text></svg>" />
        <meta name="theme-color" content="#e60012" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans dark`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
