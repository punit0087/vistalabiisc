import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { NavigationMenuu } from "@/components/menu/menu";

const poppins_init = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins", // Explicitly set the variable name
});

export const metadata: Metadata = {
  title: "VISTA LAB",
  description: "VISTA LAB | Indian Institute of Science, Bengaluru",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:title" content="VISTA LAB" />
        <meta
          property="og:description"
          content="VISTA LAB | Indian Institute of Science, Bengaluru"
        />
        <meta property="og:image" content="/banner.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://vistalabiisc.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VISTALAB" />
      </head>

      <body className={poppins_init.variable}>
        <NavigationMenuu />
        {children}
      </body>
    </html>
  );
}
