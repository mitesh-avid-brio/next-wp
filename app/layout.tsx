// RootLayout.tsx
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Main } from "@/components/craft";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/nav/nav";
import { Footer } from "@/components/footer/footer";
import dynamic from "next/dynamic"; 


const ReduxProvider = dynamic(() => import("@/store/redux-provider"), {
  ssr: false
});
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WordPress & Next.js Starter by 9d8",
  description: "A starter template for Next.js with WordPress as a headless CMS.",
  metadataBase: new URL("https://wp.9d8.dev"),
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Nav />
            <Main>{children}</Main>
            <Footer />
          </ThemeProvider>
        </ReduxProvider> 
        <Analytics />
      </body>
    </html>
  );
}
