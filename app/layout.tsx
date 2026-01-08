import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Dr. Oluwayemisi Bosede Ayinde | 60th Birthday & Retirement Celebration",
  description:
    "Celebrating 60 Years of Grace & 29 Years of Dedicated Service in Education. Join us in honoring Dr. Oluwayemisi Bosede Ayinde on this momentous occasion.",
  keywords: ["60th birthday", "retirement celebration", "Dr. Ayinde", "education", "Nigeria"],
  openGraph: {
    title: "Dr. Oluwayemisi Bosede Ayinde | 60th Birthday & Retirement Celebration",
    description: "Celebrating 60 Years of Grace & 29 Years of Dedicated Service",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Oluwayemisi Bosede Ayinde | 60th Birthday & Retirement Celebration",
    description: "Celebrating 60 Years of Grace & 29 Years of Dedicated Service",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
