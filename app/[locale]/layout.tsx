import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, IBM_Plex_Mono, Noto_Sans_Lao } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "@/app/globals.css";
import "xterm/css/xterm.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const notoSansLao = Noto_Sans_Lao({
  variable: "--font-noto-sans-lao",
  subsets: ["lao"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Maximiliano Brito Torres | Senior Full-Stack Developer (Next.js, React, Node.js) — Remote",
    template: "%s | Maxon Torres",
  },
  description:
    "Senior Full-Stack Developer specializing in Next.js, React, Node.js, GraphQL, and AWS Serverless architecture. Building scalable, high-performance web applications for global companies. Available for remote work.",
  keywords: [
    "Senior Full Stack Developer",
    "Web Developer Vientiane",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "GraphQL Developer",
    "AWS Serverless Developer",
    "Remote Software Engineer",
    "JavaScript Engineer",
    "Full Stack Developer Laos",
  ],
  openGraph: {
    title:
      "Maximiliano Brito Torres | Senior Full-Stack Developer (Next.js, React, Node.js)",
    description:
      "Building scalable web applications with Next.js, React, Node.js and AWS. Available for remote opportunities worldwide.",
    url: "https://maxontorres.com",
    siteName: "Maxon Torres",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maximiliano Brito Torres - Full Stack Developer",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} data-theme="dark" className={locale === 'lo' ? 'locale-lao' : 'locale-en'}>
      <head>
        <meta name="theme-color" content="#0a0a0c" id="meta-theme-color" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${ibmPlexMono.variable} ${notoSansLao.variable} antialiased min-h-screen overflow-x-hidden transition-colors duration-300`}
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)'
        }}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}