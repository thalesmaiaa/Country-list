import { ComponentProps, ElementType } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
  base: [
    'flex gap-2 items-center justify-center font-normal text-darkBlue bg-white relative z-20 shadow-navbar dark:bg-darkBlue dark:text-white',
    'dark:hover:text-darkBlue dark:hover:bg-white hover:text-white hover:bg-darkBlue truncate ',
  ],
  variants: {
    size: {
      large: ' px-10 py-2 text-lg rounded-lg w-40',
      small: 'px-7 py-1 rounded-sm text-sm w-28 whitespace-nowrap',
    },
  },
  defaultVariants: {
    size: 'large',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof button> & {
    Icon?: ElementType
  }

export function Button({
  Icon,
  children,
  className,
  size,
  ...props
}: ButtonProps) {
  return (
    <button className={button({ size, className })} {...props}>
      {Icon && <Icon />}
      {children}
    </button>
  )
}
