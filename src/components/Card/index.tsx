/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/navigation'

import { formatNumber } from '@/utils/formatNumber'
import { Country } from '@/services/contexts'

type CardProps = {
  item: Country
}

export function Card({ item }: CardProps) {
  const router = useRouter()

  const {
    capital,
    population,
    region,
    flags: { png, alt },
    name: { official, common },
  } = item

  return (
    <div
      className="flex flex-col dark:bg-darkBlue bg-white relative z-20 shadow-navbar w-64 pb-3 rounded-md cursor-pointer"
      onClick={() => {
        router.push(`/${common.toLowerCase()}`)
      }}
    >
      <img
        className=" w-full h-image rounded-t-md rounded-r-md rounded-b-none"
        src={png}
        alt={alt}
      />

      <div className="flex flex-col px-6 pt-6 dark:text-white text-darkBlue">
        <p className="mb-4 text-lg font-bold h-16 truncate">{official}</p>
        <p className="text-sm font-medium capitalize">
          Population:{' '}
          <span className="text-sm text-darkGray font-normal tabular-nums">
            {formatNumber(population)}
          </span>
        </p>
        <p className="text-sm font-medium capitalize">
          Region:{' '}
          <span className="text-sm text-darkGray font-normal ms">{region}</span>
        </p>
        <p className="text-sm font-medium capitalize">
          Capital:{' '}
          <span className="text-sm text-darkGray font-normal ">{capital}</span>
        </p>
      </div>
    </div>
  )
}
