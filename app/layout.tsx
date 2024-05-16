import type { Metadata } from "next";
import { Inter } from "next/font/google";
//import "./style/globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
