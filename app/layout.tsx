import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
