
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lingo | Word Guessing Game",
  description: "Guess the hidden five-letter word in six tries.",
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
