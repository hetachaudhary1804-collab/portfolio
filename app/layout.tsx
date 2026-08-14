import type { Metadata } from "next";
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
  title: "Heta Patel | Junior Software Engineer Portfolio",

  description:
    "Interactive 3D developer portfolio of Heta Patel, a Junior Software Engineer specializing in modern React/Next.js interfaces, PHP/Yii2 backend applications, responsive interfaces, and 3D WebGL experiences.",

  keywords: [
    "Heta Patel",
    "Software Engineer",
    "Web Developer",
    "React",
    "Next.js",
    "PHP",
    "Yii2",
    "MySQL",
    "3D Portfolio",
  ],

  authors: [
    {
      name: "Heta Patel",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}
    >
      <body
        className="
          min-h-full
          bg-[#030014]
          text-slate-100
          selection:bg-cyan-500/30
          selection:text-cyan-200
        "
      >
        {children}
      </body>
    </html>
  );
}
