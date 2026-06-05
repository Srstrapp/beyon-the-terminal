import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Jhon Mercado - Portfolio",
  description: "Beyond the terminal. Developer by trade, explorer by nature.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrains.variable} ${playfair.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col transition-colors duration-500">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
