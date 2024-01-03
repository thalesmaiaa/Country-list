'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/Button'
import { appendDots } from '@/hooks/appendDots'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Country } from '@/services/contexts'
import { useCallback } from 'react'

type Props = {
  country: Country
  codes?: Record<string, string>
}

export function Borders({ country, codes }: Props) {
  const router = useRouter()

  const [parent] = useAutoAnimate()

  const getCountryBorders = useCallback(
    (borders: string[]) => {
      const borderCountries: string[] = []
      if (codes) {
        borders.forEach((border) => {
          borderCountries.push(codes?.[border])
        })
      }

      return borderCountries
    },
    [codes],
  )

  return (
    <>
      {!!country.borders.length && (
        <div
          className="flex  desktop:items-center gap-4 flex-wrap truncate pb-6"
          ref={parent}
        >
          <span className="w-full desktop:w-fit text-base font-normal capitalize">
            Border Countries:
          </span>
          {getCountryBorders(country.borders).map((border) => (
            <Button
              size="small"
              key={border}
              onClick={() => router.push(`/${border}`)}
            >
              {appendDots(border, 15)}
            </Button>
          ))}
        </div>
      )}
    </>
  )
}
