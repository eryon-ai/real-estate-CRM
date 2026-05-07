import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import CustomCursor from '@/components/realist/CustomCursor';
import SmoothScroll from '@/components/realist/SmoothScroll';
import ScrollProgress from '@/components/realist/ScrollProgress';
import ToastContainer from '@/components/realist/ToastContainer';
import BackToTop from '@/components/realist/BackToTop';
import WhatsAppButton from '@/components/realist/WhatsAppButton';
import MobileBottomNav from '@/components/realist/MobileBottomNav';
import ExitIntentPopup from '@/components/realist/ExitIntentPopup';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic']
});

export const metadata: Metadata = {
  title: 'REALIST | Ultra-Premium Real Estate',
  description: 'Curated luxury properties and architectural masterpieces for discerning clients worldwide.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#F4F1E8] text-[#1A1A1A]`}>
        <StoreProvider>
          <SmoothScroll />
          <ScrollProgress />
          <CustomCursor />
          <ExitIntentPopup />
          {children}
          <ToastContainer />
          <BackToTop />
          <WhatsAppButton />
          <MobileBottomNav />
        </StoreProvider>
      </body>
    </html>
  );
}
