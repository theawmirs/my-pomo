import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Provier from "./provider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyPomo - Boost Your Focus",
  description:
    "Boost your focus with the Pomodoro technique. Custom timer, breaks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased`}>
        <Provier>{children}</Provier>
      </body>
    </html>
  );
}
