import { Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Navbar() {
  const router = useRouter()

  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDarkTheme = theme === 'dark'

  return (
    <nav className="relative z-20 shadow-navbar bg-white text-darkBlue dark:bg-darkBlue h-20 desktop:px-20 px-10 flex justify-between items-center dark:text-white">
      <div
        className="font-bold text-2xl cursor-pointer"
        onClick={() => router.push('/')}
      >
        Where in the world?
      </div>
      <div
        className="flex items-center gap-3 font-normal text-lg cursor-pointer"
        onClick={() => (isDarkTheme ? setTheme('light') : setTheme('dark'))}
      >
        <Moon className="desktop:w-4 desktop:h-4 w-6 h-6" />
        <button className="capitalize desktop:flex hidden">
          {isDarkTheme ? 'light' : 'dark'} mode
        </button>
      </div>
    </nav>
  )
}
