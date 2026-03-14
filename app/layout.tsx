import type React from "react"
import type { Metadata } from "next"
import { fraunces, literata, caveat } from "@/lib/fonts"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE | Retirement Celebration",
  description:
    "Ìmọ̀ ní Ipò Ọlá — In Celebration of 35 Years of Meritorious Service. Honouring Chief (Mrs) Temitope Oluwakemi Ogundare, Principal of Agbado District Comprehensive High School, Senior, Oke Aro.",
  keywords: ["retirement celebration", "Chief Mrs Ogundare", "FIWAGBOYE", "Agbado DCHS", "education", "Ogun State", "Nigeria"],
  openGraph: {
    title: "Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE | Retirement Celebration",
    description: "Ìmọ̀ ní Ipò Ọlá — 35 Years of Meritorious Service in Education",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE | Retirement Celebration",
    description: "Ìmọ̀ ní Ipò Ọlá — 35 Years of Meritorious Service in Education",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${literata.variable} ${caveat.variable}`}>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
