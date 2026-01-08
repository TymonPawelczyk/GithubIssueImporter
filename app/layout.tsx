import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { InfoModal } from "@/components/InfoModal";
import { LanguageProvider } from "@/components/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "GitHub Issue Importer",
  description: "Import issues from CSV/Excel to GitHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {/* Top Right Controls */}
            <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
              <LanguageSwitcher />
              <InfoModal />
              <ThemeToggle />
            </div>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
