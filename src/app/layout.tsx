import type { Metadata } from "next";
import { Playfair_Display, Archivo } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Halyard House · Rest, at the edge of the Pacific",
  description:
    "A boutique hotel on the Mendocino coast. Five kinds of rest, a table worth staying in for, and the wild edge of the Pacific at your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
