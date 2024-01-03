/* eslint-disable @next/next/no-img-element */
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { useQueryClient } from 'react-query'

import { ArrowLeft } from 'lucide-react'

import { motion } from 'framer-motion'
import { Button } from '@/components/Button'
import { Loader } from '@/components/Loader'
import { formatCurrency } from '@/utils/formatCurrecy'
import { formatLanguages } from '@/utils/formatLanguages'
import { formatNumber } from '@/utils/formatNumber'
import { Borders, DescriptionItem } from './components'
import { useCountry } from '@/hooks/useCountry'
import { Country, useCountryContext } from '@/services/contexts'

type Props = {
  params: {
    name: string
  }
}

export default function Country({ params }: Props) {
  const router = useRouter()

  const { countryList } = useCountryContext()

  const { getCountryByName } = useCountry({ countryList: countryList || [] })

  const queryClient = useQueryClient()
  const filteredList = queryClient.getQueryData<Country[]>('countryList')
  const country = filteredList?.[0]

  const { name } = params

  useEffect(() => {
    getCountryByName(decodeURIComponent(`${name}`))
  }, [getCountryByName, name, queryClient])

  const codesTranslation = useMemo(() => {
    if (countryList?.length) {
      return countryList?.reduce(
        (acc: Record<string, string>, item: Country) => {
          acc[item.cca3] = item.name.common
          return acc
        },
        {},
      )
    }
  }, [countryList])

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
              <DescriptionItem
                title="Native name"
                value={country.name.official}
              />
              <DescriptionItem
                title="Population"
                value={formatNumber(country.population)}
              />
              <DescriptionItem title="Region" value={country.region} />
              <DescriptionItem title="Sub Region" value={country.subregion} />
              <DescriptionItem title="Capital" value={country.capital} />
              <DescriptionItem
                title="Currency"
                value={formatCurrency(country.currencies)}
              />
              <DescriptionItem
                title="Languages"
                value={formatLanguages(country.languages)}
              />
            </div>
          </div>
          <Borders country={country} codes={codesTranslation} />
        </div>
      </div>
    </div>
  )
}
