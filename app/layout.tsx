import type React from "react"
import type { Metadata } from "next"
import { Merriweather, Public_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-merriweather",
})
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public-sans" })

export const metadata: Metadata = {
  title: "Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE | Retirement Celebration",
  description:
    "In Celebration of 35 Years of Meritorious Service. Honouring Chief (Mrs) Temitope Oluwakemi Ogundare, Principal of Agbado District Comprehensive High School, Senior, Oke Aro.",
  keywords: ["retirement celebration", "Chief Mrs Ogundare", "FIWAGBOYE", "Agbado DCHS", "education", "Ogun State", "Nigeria"],
  openGraph: {
    title: "Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE | Retirement Celebration",
    description: "35 Years of Meritorious Service in Education",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE | Retirement Celebration",
    description: "35 Years of Meritorious Service in Education",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${merriweather.variable} ${publicSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
