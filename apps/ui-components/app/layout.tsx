import type { Metadata } from "next";

import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
