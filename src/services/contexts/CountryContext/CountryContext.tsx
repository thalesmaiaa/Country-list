import { createContext } from 'react'
import { UseQueryResult } from 'react-query'

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

type CountryContextProps = {
  useQueryCountry: () => UseQueryResult<Country[], unknown>
  countryList?: Country[]
}

const CountryContext = createContext<CountryContextProps>({
  useQueryCountry: () => ({}) as UseQueryResult<Country[], unknown>,
  countryList: [],
})

CountryContext.displayName = 'CountryContext'

export { CountryContext }
