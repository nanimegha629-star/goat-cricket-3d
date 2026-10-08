import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GOAT Cricket 3D",
  description: "11 vs 11 browser cricket game"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
