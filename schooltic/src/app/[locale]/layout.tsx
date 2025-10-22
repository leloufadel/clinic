import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import NewsTicker from "../../components/NewsTicker";

export const metadata: Metadata = {
  title: "EETFP-TIC - École d'Enseignement Technique et de Formation Professionnelle TIC à Nouakchott",
  description: "École d'Enseignement Technique et de Formation Professionnelle dans le domaine des Technologies d'Information et de Communication à Nouakchott, Mauritanie. Formation BTS et continue.",
  keywords: "EETFP-TIC, Nouakchott, Mauritanie, formation technique, BTS, TIC, informatique, télécom, énergie",
  icons: {
    icon: [
      { url: '/logo.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/logo.jpg', sizes: '16x16', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/logo.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#1e40af",
  manifest: "/manifest.json",
};

// Static rendering support
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body
        className="antialiased font-sans"
        suppressHydrationWarning
      >
        <NextIntlClientProvider>
          <Navbar />
          <NewsTicker variant="banner" />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
