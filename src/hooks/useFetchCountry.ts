import { queryClient } from '@/services/queryClient'

import { api } from '@/services/api'
import { useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

export type Country = {
  name: {
    official: string
    common: string
  }
  population: number
  flags: {
    png: string
    alt: string
  }
  region: string
  capital: string
  subregion: string
  currencies: {
    [key: string]: object
  }
  languages: {
    [key: string]: object
  }
  borders: string[]

  cca3: string
}

type Props = {
  list: Country[]
  isFetching: boolean
  resetFilters: () => void
  getCountryByName: (name: string) => void
  filterByRegion: (region: string) => void
  getCountryBorders: (borders: string[]) => string[]
}

export const useFetchCountry = (): Props => {
  const [countryList, setCountryList] = useState<Country[]>()

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

  const getCountryBorders = useCallback(
    (borders: string[]) => {
      const borderCountries: string[] = []
      if (codesTranslation) {
        borders.forEach((border) => {
          borderCountries.push(codesTranslation?.[border])
        })
      }

      return borderCountries
    },
    [codesTranslation],
  )

  const fetchCountries = async () => {
    const response = await api.get(
      '/all?fields=name,population,region,capital,flags,subregion,currencies,languages,borders,cca3',
    )

    setCountryList(response.data)
    return response.data
  }

  const { isFetching, data: list } = useQuery('countryList', fetchCountries)

  const getCountryByName = (name: string) => {
    const currentCountry = countryList?.filter((country: Country) =>
      country.name.common.toLowerCase().includes(name.toLowerCase()),
    )

    queryClient.setQueryData('countryList', currentCountry)
  }

  const filterByRegion = (region: string) => {
    const currentRegion = countryList?.filter(
      (country: Country) =>
        country.region.toLowerCase() === region.toLowerCase(),
    )
    queryClient.setQueryData('countryList', currentRegion)
  }

  const resetFilters = () => {
    queryClient.refetchQueries('countryList')
  }

  return {
    list,
    isFetching,
    resetFilters,
    getCountryByName,
    filterByRegion,
    getCountryBorders,
  }
}
