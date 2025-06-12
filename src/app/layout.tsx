import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Flag Guesser",
  description: "Guess what country a flag belongs to",
  other: {
    "google-adsense-account": "ca-pub-8594891858511370",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ThemeToggle className="fixed bottom-3 right-3" />
        </ThemeProvider>
      </body>
    </html>
  );
}
