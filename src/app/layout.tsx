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
  description: "VISTA LAB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins_init.variable}>
        <NavigationMenuu />
        {children}
      </body>
    </html>
  );
}
