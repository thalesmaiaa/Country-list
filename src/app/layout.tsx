'use client'

import './globals.css'
import { Nunito_Sans as NunitoSans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/services/queryClient'
import { ThemeProvider } from './providers/theme'
import { CountryContextProvider } from './providers/CountryContextProvider'

const font = NunitoSans({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialised" suppressHydrationWarning>
      <QueryClientProvider client={queryClient}>
        <body className={font.className}>
          <CountryContextProvider>
            <div className="min-h-screen dark:bg-veryDarkBlueBackground bg-white">
              <ThemeProvider attribute="class" enableSystem={false}>
                <Navbar />
                <main className="dark:bg-veryDarkBlueBackground bg-white  desktop:px-20 px-10  pt-10 desktop:pt-20">
                  {children}
                </main>
              </ThemeProvider>
            </div>
          </CountryContextProvider>
        </body>
      </QueryClientProvider>
    </html>
  )
}
