import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from 'next-themes';
import { Footer } from "./footer";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "yaps[dot]music - playing random tracks from youtube",
  description: "just playing random tracks from youtube",
  metadataBase: new URL("https://yaps.chat"),
  keywords: ["ai builder", "youtube creator", "open-source builder", "open-source"],
  
  alternates: {
    canonical: "/",
  },

  authors: [
    {
      name: "Ibrohim Abdivokhidov",
      url: "https://github.com/abdibrokhim",
    },
  ],

  openGraph: {
    title: "yaps[dot]music - playing random tracks from youtube",
    description: "just playing random tracks from youtube",
    type: "website",
    url: "/",
    images: [
      {
        url: "/yapsdotgg.png",
        width: 1200,
        height: 630,
        alt: "OG Image",
      },
    ],
  },
  
  icons: {
    icon: '/favicon.ico',
  },

  twitter: {
    card: 'summary_large_image',
    title: "yaps[dot]music - playing random tracks from youtube",
    description: "just playing random tracks from youtube",
    images: ['/yapsdotgg.png'],
    site: '@abdibrokhim',
    creator: '@abdibrokhim',
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },

  appleWebApp: {
    title: 'abee',
    statusBarStyle: 'black-translucent',
  },
  
  appLinks: {
    web: {
      url: 'https://yaps.chat',
      should_fallback: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-zinc-950 text-black dark:text-white`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-geist-sans)] bg-white dark:bg-zinc-950">
            <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
              {children}
              <Footer />
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
