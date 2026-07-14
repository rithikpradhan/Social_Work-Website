import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Mr_De_Haviland, Dancing_Script } from "next/font/google";
import SmoothScrolling from "@/components/SmoothScrolling";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const mrDeHaviland = Mr_De_Haviland({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "GenocideEdu | Genocide Education & Human Rights Initiative",
  description: "NGO committed to providing better education, care, and human rights services to children, helping build a brighter and secure future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${mrDeHaviland.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-950 text-white font-sans">
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}

