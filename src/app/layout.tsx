import type { Metadata } from "next";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import "./globals.css";
import { Manrope } from "next/font/google";
import { Viewport } from "next";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from 'next/dynamic';

const Trial = dynamic(() => import('../components/Trial/Trial'), {
  loading: () => (
    <div style={{ 
      minHeight: '400px',
      padding: '60px 20px',
      background: 'transparent'
    }} />
  ),
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StreamVibe",
  description:
    "StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere.",
  openGraph: {
    title: "StreamVibe",
    description:
      "StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere.",
    url: "https://streamvibe.vercel.app/",
    siteName: "StreamVibe",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="preconnect" href="https://api.themoviedb.org" />
      </head>
      <body className={manrope.className}>
        <TanStackProvider>
          <div className="layout-wrapper">
            <Header />
            <main>
              <svg
                aria-hidden="true"
                style={{ width: 0, height: 0, position: "absolute" }}
              >
                <defs>
                  <linearGradient
                    id="mainIconGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{
                        stopColor: "rgb(255, 255, 255)",
                        stopOpacity: 0.4,
                      }}
                    />
                    <stop
                      offset="100%"
                      style={{
                        stopColor: "rgb(255, 255, 255)",
                        stopOpacity: 0.2,
                      }}
                    />
                  </linearGradient>
                </defs>
              </svg>
              {children}
              <Trial />
            </main>
            <Footer />
          </div>
        </TanStackProvider>
        <ToastContainer position="top-center" autoClose={4000} />
      </body>
    </html>
  );
}
