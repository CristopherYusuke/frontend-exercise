import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/util/Providers";
import Logo from "./components/ui/logo";
import Main from "@/app/components/ui/main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Starwarsplanet",
  description: "Star wars planets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Main>
          <Logo />
          <Provider>{children}</Provider>
        </Main>
      </body>
    </html>
  );
}
