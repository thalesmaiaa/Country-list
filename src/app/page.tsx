/* eslint-disable @next/next/no-img-element */
'use client'

import { createRef } from 'react'

import { SearchIcon } from 'lucide-react'
import * as Select from '@radix-ui/react-select'
import { SelectItem } from '@/components/Select/SelectItem'
import { SelectTrigger } from '@/components/Select/SelectTrigger'
import { useFetchCountry } from '@/hooks/useFetchCountry'
import { Card } from '@/components/Card'
import { useDebounce } from '@/hooks/useDebounce'
import { Loader } from '@/components/Loader'

export default function Home() {
  const { isFetching, list, getCountryByName, resetFilters, filterByRegion } =
    useFetchCountry()
  const query = createRef<HTMLInputElement>()

  const handleInputChange = () => {
    if (!query?.current?.value) {
      resetFilters()
    }
    getCountryByName(query?.current?.value as string)
  }

  const handleChange = useDebounce(handleInputChange, 1000)

  if (isFetching) {
    return <Loader />
  }

  return (
    <div>
      <div className="flex flex-col w-full gap-5">
        <div className="flex justify-between flex-wrap desktop:flex-nowrap desktop:gap-0 gap-2">
          <div className="relative shadow-navbar z-20 flex items-center  desktop:w-input  w-full gap-6 dark:bg-darkBlue px-7 py-4  rounded-md  dark:text-white bg-white text-darkBlue">
            <SearchIcon className="w-5 h-5" />
            <input
              className="flex flex-1 cursor-pointer bg-transparent outline-none  dark:placeholder:text-white placeholder:text-darkBlue"
              placeholder="Search for a country..."
              ref={query}
              onChange={handleChange}
            />
          </div>
          <Select.Root onValueChange={filterByRegion}>
            <SelectTrigger />

            <Select.Portal>
              <Select.Content
                side="bottom"
                position="popper"
                sideOffset={8}
                className="relative shadow-navbar z-20 w-select outline-none dark:bg-darkBlue rounded-md dark:text-white border-none  text-darkBlue bg-white"
              >
                <Select.Viewport>
                  <SelectItem value="Africa" />
                  <SelectItem value="Americas" />
                  <SelectItem value="Asia" />
                  <SelectItem value="Europe" />
                  <SelectItem value="Oceania" className="py-4 pl-6" />
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        <div className="flex items-center tablet:justify-start justify-center gap-y-4 monitor:gap-x-28 desktop:gap-x-16 mobile:gap-x-4 tablet:gap-x-8 flex-wrap">
          {list?.map((item) => <Card key={item.name.official} item={item} />)}
        </div>
      </div>
    </div>
  )
}
