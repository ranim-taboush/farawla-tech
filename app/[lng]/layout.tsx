import { dir } from 'i18next'
import ToastProvider from '@/components/ToastProvider'
import '../globals.css'

import { Lalezar } from 'next/font/google'
import { languages } from '../i18n/settings'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ParticleBg from '@/components/ParticleBg'
// import AOSWrapper from '@/components/AOSWrapper'

import 'aos/dist/aos.css'
import AOSWrapper from '@/components/AOSWrapper'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const font = Lalezar({
  weight: ["400"],
  preload: true,
  variable: '--font-lalezar',
  subsets: ['arabic', 'latin'],
  display: 'swap'
})


export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: {
    lng
  }
}: {
  children: React.ReactNode,
  params: {
    lng: string
  }
}) {
  return (
    <html lang={lng} dir={dir(lng)} className={font.className}>
      <body >
        <ToastProvider />
        <ParticleBg />
        <AOSWrapper />
        <div className="relative">
          {/* @ts-expect-error Server Component */}
          <Navbar lng={lng} />
        </div>
        {children}
        {/* @ts-expect-error Server Component */}
        <Footer lng={lng} />
      </body>
    </html>
  )
}
