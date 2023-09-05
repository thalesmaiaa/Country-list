/* eslint-disable @next/next/no-img-element */
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useQueryClient } from 'react-query'

import { ArrowLeft } from 'lucide-react'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { motion } from 'framer-motion'
import { Button } from '@/components/Button'
import { Loader } from '@/components/Loader'
import { appendDots } from '@/hooks/appendDots'
import { Country, useFetchCountry } from '@/hooks/useFetchCountry'
import { formatCurrency } from '@/utils/formatCurrecy'
import { formatLanguages } from '@/utils/formatLanguages'
import { formatNumber } from '@/utils/formatNumber'

type Props = {
  params: {
    name: string
  }
}

export default function Country({ params }: Props) {
  const router = useRouter()

  const { getCountryBorders, getCountryByName } = useFetchCountry()

  const queryClient = useQueryClient()
  const filteredList = queryClient.getQueryData<Country[]>('countryList')
  const country = filteredList?.[0]

  const { name } = params

  useEffect(() => {
    getCountryByName(decodeURIComponent(`${name}`))
  }, [getCountryByName, name, queryClient])

  const [parent] = useAutoAnimate()

  if (!country) {
    return <Loader />
  }

  return (
    <div className="flex flex-col gap-16 ">
      <Button Icon={ArrowLeft} onClick={() => router.back()}>
        Back
      </Button>
      <div className="flex desktop:flex-row flex-col gap-6 desktop:gap-32 w-country">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="min-w-fit"
        >
          <img
            src={country.flags.png}
            alt={country.flags.alt}
            className="w-flag h-flag object-contain"
          />
        </motion.div>

        <div className="flex flex-col  gap-14 items-start py-10 dark:text-white text-darkBlue">
          <span className=" text-3xl font-extrabold capitalize">
            {country.name.common}
          </span>
          <div className="flex flex-col desktop:flex-row desktop:gap-32 gap-16 ">
            <div className="flex flex-col gap-3">
              <span className="text-base font-normal capitalize">
                Native name: {country.name.official}
              </span>
              <span className="text-base font-normal capitalize">
                Population: {formatNumber(country.population)}
              </span>
              <span className="text-base font-normal capitalize">
                Region: {country.region}
              </span>
              <span className="text-base font-normal capitalize">
                Sub Region: {country.subregion}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-base font-normal capitalize">
                Capital: {country.capital}
              </span>
              <span className="text-base font-normal capitalize">
                Currency: {formatCurrency(country.currencies)}
              </span>
              <span className="text-base font-normal capitalize">
                Languages: {formatLanguages(country.languages)}
              </span>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  )
}
