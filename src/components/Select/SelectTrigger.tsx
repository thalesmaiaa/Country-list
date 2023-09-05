import * as Select from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'

export function SelectTrigger() {
  return (
    <Select.Trigger className="relative z-20 shadow-navbar  w-full desktop:w-select dark:bg-darkBlue rounded-md dark:text-white text-darkBlue bg-white outline-none flex items-center py-4 pl-6 pr-3 justify-between">
      <Select.Value placeholder="Filter by region" />
      <Select.Icon>
        <ChevronDown className="w-6 h-6" />
      </Select.Icon>
    </Select.Trigger>
  )
}
