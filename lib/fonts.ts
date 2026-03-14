import { Fraunces, Literata, Caveat } from 'next/font/google'

export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
})

export const literata = Literata({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
})

export const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-accent',
  weight: ['400', '700'],
})
