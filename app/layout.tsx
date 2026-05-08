import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
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
    "Dawlish street food",
  ],
  openGraph: {
    title: "ReLoaded Dawlish",
    description:
      "Loaded fries, burgers, chicken, tofu and serious flavour at 3 Piermont Place, Dawlish.",
    type: "website",
    locale: "en_GB",
    siteName: "ReLoaded Dawlish",
    images: [
      {
        url: "/ReLoaded-Red-on-White-Transp.png",
        alt: "ReLoaded Dawlish logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReLoaded Dawlish",
    description:
      "Loaded fries, burgers, chicken, tofu and serious flavour at 3 Piermont Place, Dawlish.",
    images: ["/ReLoaded-Red-on-White-Transp.png"],
  },
  icons: {
    icon: "/ReLoaded-Red-on-White-Transp.png",
    apple: "/ReLoaded-Red-on-White-Transp.png",
    shortcut: "/ReLoaded-Red-on-White-Transp.png",
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
