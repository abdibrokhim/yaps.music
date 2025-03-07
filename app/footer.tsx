'use client'
// import { TextLoop } from '@/components/motion-primitives/text-loop'
import { MoonStar, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      className="inline-flex h-7 w-7 items-center justify-center text-zinc-300 transition-all duration-200 focus-visible:outline-2 dark:text-zinc-600 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-md"
      type="button"
      aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
      onClick={toggleTheme}
    >
      {theme === 'light' ? <MoonStar className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
    </button>
  )
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-900">
      <div className="flex items-center justify-between">
        <a className='text-[10px] text-zinc-300 dark:text-zinc-600' href="https://yaps.gg" target="_blank" rel='noreferrer noopener'>
            <span>© 2024 YAPS WORLD</span>
        </a>
        <div className="text-xs text-zinc-400">
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  )
}
