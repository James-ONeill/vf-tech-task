import AppLayout from "@/components/AppLayout";
import clsx from "clsx";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VF Resourcing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(montserrat.className, "bg-white")}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
