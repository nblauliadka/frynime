import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/Navbar';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frynime - Tempat Nonton Anime Sub Indo Gratis Terbaik',
  description: 'Nonton streaming anime subtitle Indonesia gratis terlengkap dengan resolusi tinggi. Tanpa iklan ribet, tanpa registrasi. Frynime adalah website nonton anime online gratis terbaik.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-zinc-950 text-[#e0e0e0] font-sans`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <div className="flex flex-col md:flex-row min-h-screen relative">
            <Navbar />
            <div className="flex-1 flex flex-col md:pl-64 pt-16 md:pt-0 pb-20 md:pb-0 min-w-0">
              <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
