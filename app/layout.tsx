import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://reloadeddawlish.co.uk"),
  title: "ReLoaded Dawlish",
  description:
    "Loaded fries, burgers, chicken, tofu and serious flavour at 3 Piermont Place, Dawlish.",
  keywords: [
    "ReLoaded Dawlish",
    "Dawlish food",
    "Dawlish takeaway",
    "Dawlish burgers",
    "Dawlish loaded fries",
    "burgers in Dawlish",
    "loaded fries Dawlish",
    "ReLoaded takeaway Dawlish",
  ],
  openGraph: {
    title: "ReLoaded Dawlish",
    description:
      "Loaded fries, burgers, chicken, tofu and serious flavour at 3 Piermont Place, Dawlish.",
    url: "https://reloadeddawlish.co.uk",
    type: "website",
    locale: "en_GB",
    siteName: "ReLoaded Dawlish",
    images: [
      {
        url: "/apple-touch-icon.png",
        alt: "ReLoaded Dawlish social preview logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReLoaded Dawlish",
    description:
      "Loaded fries, burgers, chicken, tofu and serious flavour at 3 Piermont Place, Dawlish.",
    images: ["/apple-touch-icon.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Analytics placeholder: add Google Analytics script here when the production GA ID is confirmed. */}
        {/* Analytics placeholder: add Plausible script here if ReLoaded chooses privacy-first analytics. */}
        {children}
      </body>
    </html>
  );
}
