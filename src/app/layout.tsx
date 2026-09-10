import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ProfileProvider } from "@/context/ProfileContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { THEME_INIT_SCRIPT } from "@/lib/settings";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vibekurs - lær vibecoding",
  description:
    "Lær å bygge programvare sammen med AI, steg for steg, på en lekende og motiverende måte.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="no"
      className={`${baloo.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)]">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <SettingsProvider>
          <ProfileProvider>{children}</ProfileProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
