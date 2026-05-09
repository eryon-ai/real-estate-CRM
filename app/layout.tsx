import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import ClientUtilities from '@/components/realist/ClientUtilities';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'REALIST | Ultra-Premium Real Estate',
  description: 'Curated luxury properties and architectural masterpieces for discerning clients worldwide.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#F4F1E8] text-[#1A1A1A]`}>
        <StoreProvider>
          <ClientUtilities />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
