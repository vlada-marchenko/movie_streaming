import type { Metadata } from 'next';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import './globals.css';
import { Manrope } from 'next/font/google';
import { Viewport } from 'next';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});


export const metadata: Metadata = {
  title: 'StreamVibe',
  description: 'StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere.',
  openGraph: {
    title: 'StreamVibe',
    description: 'StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere.',
    url: 'https://streamvibe.vercel.app/',
    siteName: 'StreamVibe',
    type: 'website'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className={manrope.className}>
        <TanStackProvider>
          <div className="layout-wrapper">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        </TanStackProvider>
        <ToastContainer position="top-center" autoClose={4000} />
      </body>
    </html>
  );
}