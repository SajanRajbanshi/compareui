import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "CompareUI - Multi-Library Playground",
  description: "Compare UI components across different libraries like MUI, Chakra, AntD, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-[100dvh] overflow-hidden">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
