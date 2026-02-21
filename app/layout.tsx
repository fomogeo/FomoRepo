import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EmailPopup from '@/components/EmailPopup'

export const metadata: Metadata = {
  title: {
    default: 'FomoGeo – Verified Deals from Around the World',
    template: '%s | FomoGeo'
  },
  description: 'Discover verified deals and trending products from around the globe. Your trusted source for the best shopping deals worldwide.',
  keywords: 'deals, discounts, trending products, best sellers, verified deals, worldwide shopping, FomoGeo',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '64x64' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [{ url: '/icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'FomoGeo – Verified Deals from Around the World',
    description: 'Discover verified deals and trending products from around the globe.',
    siteName: 'FomoGeo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FomoGeo – Verified Deals from Around the World',
    description: 'Discover verified deals and trending products from around the globe.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body style={{ background: '#071828' }}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <EmailPopup />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
