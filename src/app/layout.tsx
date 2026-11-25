import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vocabulary Tracer",
  description: "Organize, track and improve your English vocabulary.",
  icons: {
    icon: "/images/favicon.ico",
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