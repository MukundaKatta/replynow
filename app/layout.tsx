import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReplyNow — Every Google review, answered overnight.",
  description:
    "We draft a response to every review — 5 star and 1 star — in your voice. You approve in bulk each morning.",
  openGraph: {
    title: "ReplyNow — Every Google review, answered overnight.",
    description:
      "We draft a response to every review — 5 star and 1 star — in your voice. You approve in bulk each morning.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=ReplyNow&accent=sky&category=Small%20business",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=ReplyNow&accent=sky&category=Small%20business",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
