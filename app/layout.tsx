import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Toaster } from '@/components/ui/toaster';


export const metadata: Metadata = {
  title: 'Pure Art - Contemporary Art Gallery',
  description: 'Explore unique contemporary artworks and connect with the artist.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <div className="min-h-screen bg-white">
          <Navbar />
          <main>{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
