import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Estate CRM Dashboard',
  description: 'Real estate CRM dashboard built with Next.js'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
