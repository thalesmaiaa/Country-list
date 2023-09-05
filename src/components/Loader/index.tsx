import { CircleDashed } from 'lucide-react'

export function Loader() {
  return (
    <div className="bg-white dark:bg-veryDarkBlueBackground h-screen ">
      <CircleDashed className="mx-auto my-0  dark:text-white text-veryDarkBlueBackground w-12 h-screen animate-spin" />
    </div>
  )
}
