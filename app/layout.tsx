"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body >
        {/* Wrap the entire content with SessionProvider */}

          <StoreProvider>
            <ThemeProvider theme={theme}>
            <Toaster position="top-center" />{children}</ThemeProvider>
          </StoreProvider>
      </body>
    </html>
  );
}
