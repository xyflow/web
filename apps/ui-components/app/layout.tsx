import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@xyflow/react/dist/style.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "xyflow components registry",
  description:
    "Here you can find all the components we've built and are available for you to use in your projects.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
