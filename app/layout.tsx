import type { Metadata } from "next";
import { Inter, Rubik_Bubbles } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const rubikBubbles = Rubik_Bubbles({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gooey"
});

export const metadata: Metadata = {
  title: "Interdimensional Printer",
  description: "A fun interactive login page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${rubikBubbles.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
