import React, { ReactNode, useState } from 'react'
import { CountryContext } from '../../services/contexts/CountryContext'
import { api } from '@/services/api'
import { useQuery } from 'react-query'

type Country = {
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
  children?: ReactNode
}

export function CountryContextProvider({ children }: Props) {
  const [countryList, setCountryList] = useState<Country[]>([])
  const fetchCountries = async () => {
    const response = await api.get(
      '/all?fields=name,population,region,capital,flags,subregion,currencies,languages,borders,cca3',
    )
    setCountryList(response.data)
    return response.data
  }

  const useQueryCountry = () => {
    return useQuery<Country[]>({
      queryKey: 'countryList',
      queryFn: fetchCountries,
    })
  }

  return (
    <CountryContext.Provider
      value={{
        useQueryCountry,
        countryList,
      }}
    >
      {children}
    </CountryContext.Provider>
  )
}
