import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahaj — Learner's Licence, made clear",
  description:
    "An independent hackathon prototype rethinking the Learner's Licence journey on Parivahan. Not an official government product.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#14213D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
