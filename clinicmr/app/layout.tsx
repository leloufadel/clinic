import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "مصحة الحكمة - رعاية طبية متميزة",
  description: "مصحة الحكمة تقدم رعاية طبية على مدار 24 ساعة في ولاية لعصابة - طوارئ، عمليات، مختبر وعناية حديثة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
