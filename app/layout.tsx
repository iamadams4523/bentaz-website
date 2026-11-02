import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { Suspense } from 'react';
import { Background } from '@/components/layout/Background';
import { Footer } from '@/components/layout/Footer';
import { NavBar } from '@/components/layout/NavBar';
import { site } from '@/lib/site';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Digital solutions for growing businesses`,
    template: `%s | ${site.shortName}`,
  },
  description:
    'Bentaz Tech Solutions Ltd. is an Abuja-based Nigerian technology company building websites, software, AI automation, security and IT support for businesses, schools and organisations.',
};

export const viewport: Viewport = {
  themeColor: '#05071a',
};

/** Runs before first paint so a saved light-mode choice never flashes dark. Dark is the default. */
const themeScript = `try{var t=localStorage.getItem("bz-theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${poppins.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-bg font-sans text-fg">
        <Background />
        <a
          href="#main"
          className="absolute left-4 top-4 z-100 -translate-y-24 rounded-full bg-brand px-5 py-3 font-medium text-navy focus:translate-y-0"
        >
          Skip to content
        </a>
        <Suspense fallback={<div className="h-19" aria-hidden="true" />}>
          <NavBar />
        </Suspense>
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
