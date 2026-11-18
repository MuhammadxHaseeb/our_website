import type { Metadata, Viewport } from 'next';
import { Geist_Mono, Inter, Inter_Tight } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider, motionBootScript } from '@/components/motion/MotionProvider';

// Free font set (default). Self-hosted by next/font at build time. Only weights in use; all three are in the
// hero (heading, lead, labels/buttons), so all are preloaded to avoid layout shift on swap.
const interTight = Inter_Tight({ subsets: ['latin'], weight: ['300', '500'], variable: '--font-inter-tight', display: 'swap', preload: true });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-inter', display: 'swap', preload: true });
const geistMono = Geist_Mono({ subsets: ['latin'], weight: ['500'], variable: '--font-geist-mono', display: 'swap', preload: true });

// Font switch: NEXT_PUBLIC_FONT_SET=licensed uses the local Helvetica Now files (public/fonts/licensed, git-ignored).
const FONT_SET = process.env.NEXT_PUBLIC_FONT_SET === 'licensed' ? 'licensed' : 'free';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Epox: software house in Faisalabad', template: '%s · Epox' },
  description: 'Epox builds web, mobile and AI software, and finds the problem before you do. Building since 2019.',
  openGraph: { siteName: 'Epox', type: 'website' },
};

export const viewport: Viewport = { themeColor: '#0A0A0A', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-fonts={FONT_SET} className={`${interTight.variable} ${inter.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
        {FONT_SET === 'licensed' && <link rel="preload" href="/fonts/licensed/HelveticaNowDisplay-Medium.woff2" as="font" type="font/woff2" crossOrigin="" />}
      </head>
      <body>
        <MotionProvider />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
