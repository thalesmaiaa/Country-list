import { Country } from '@/services/contexts'
import { queryClient } from '@/services/queryClient'
import { useCallback } from 'react'

type Props = {
  countryList: Country[]
}

type useCountryReturn = {
  resetFilters: () => void
  getCountryByName: (name: string) => void
  filterByRegion: (region: string) => void
}

export const useCountry = ({ countryList }: Props): useCountryReturn => {
  const getCountryByName = (name: string) => {
    const currentCountry = countryList?.filter((country: Country) =>
      country.name.common.toLowerCase().includes(name.toLowerCase()),
    )

    queryClient.setQueryData('countryList', currentCountry)
  }

  const filterByRegion = (region: string) => {
    const currentRegion = countryList?.find(
      (country: Country) =>
        country.region.toLowerCase() === region.toLowerCase(),
    )
    queryClient.setQueryData('countryList', currentRegion)
  }

  const resetFilters = useCallback(() => {
    queryClient.refetchQueries('countryList')
  }, [])

  return {
    resetFilters,
    getCountryByName,
    filterByRegion,
  }
}
