import React, { useEffect, useState } from 'react'
import { MoonIcon,SunIcon } from 'lucide-react'

function ThemeIcon() {
    const [theme, setTheme] = useState('light')
    useEffect(() => {
      const savedTheme = localStorage.getItem('Theme')
      if (savedTheme) {
        setTheme(savedTheme)
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } else {
        localStorage.setItem('Theme', 'dark')
        setTheme('dark')
        document.documentElement.classList.add('dark') 
      }
    }, [])
    
    function handleClick() {
      const newTheme = theme === 'light' ? 'dark' : 'light'
      setTheme(newTheme)
      localStorage.setItem('Theme', newTheme)
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
    
  return (
    <div className='dark:text-white rounded-md border-1 p-2 border-gray-400 text-slate-900 hover:cursor-pointer' onClick={handleClick}>
        {
            theme === 'dark' ? <MoonIcon/> : <SunIcon/>
        }
    </div>
  )
}

export default ThemeIcon