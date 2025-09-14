import { Inter } from "next/font/google";
import { Playfair } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
// export const satoshi = localFont({
//   src: "../styles/Satoshi-Variable.woff2",
//   variable: "--font-satoshi",
//   weight: "300 900",
//   display: "swap",
//   style: "normal",
// });

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const playfair = Playfair({
  subsets: ['latin'],
  variable: '--font-playfair', // Create a CSS variable
});

export const robotoMono = Playfair({
  subsets: ['latin'],
  variable: '--font-mono', // Create a CSS variable
});
// export const geistMono = GeistMono;
