import * as Select from '@radix-ui/react-select'
import { twMerge } from 'tailwind-merge'

type Props = Select.SelectItemProps

export function SelectItem({ value, className, ...props }: Props) {
  return (
    <Select.Item
      value={value}
      className={twMerge([
        'pl-6 pt-4 outline-none cursor-pointer hover:dark:bg-white hover:dark:text-darkBlue hover:text-white hover:bg-darkBlue',
        className,
      ])}
      {...props}
    >
      <Select.ItemText>{value}</Select.ItemText>
    </Select.Item>
  )
}
