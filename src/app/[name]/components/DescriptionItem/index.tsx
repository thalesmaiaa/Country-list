type Props = {
  title: string
  value: string
}

export function DescriptionItem({ title, value }: Props) {
  return (
    <span className="text-base font-normal capitalize">
      {title}: {value}
    </span>
  )
}
