'use client'

import { ThemeProvider as Provider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

type Props = ThemeProviderProps

export function ThemeProvider(props: Props) {
  return <Provider {...props} />
}
