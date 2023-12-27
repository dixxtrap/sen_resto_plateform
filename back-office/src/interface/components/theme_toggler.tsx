import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import themeSlice, { selectCurrentTheme, toggleTheme } from '../../core/features/theme.slice'
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
export const ThemeToggler= () => {
        
   const toggler= useDispatch();
   const theme= useSelector(selectCurrentTheme);
   
  const [enabled, setEnabled] = useState(false)
  return (
  
    <div className="py-16">
      <Switch
        checked={theme==="dark"}
        onChange={()=>{toggler(toggleTheme())}}
        className={`bg-primary-400  relative inline-flex h-[30px] w-[55px]  ring-1 p-[2px] ring-primary-50/30 cursor-pointer rounded-md border-3 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${theme==="dark" ? 'translate-x-6' : 'translate-x-0'} 
          p-[2px]  pointer-events-none inline-block h-[26px] w-[26px] my-auto transform rounded-md bg-white/70 dark:bg-black/40 shadow-lg ring-0   duration-200 ease-in-out`}
        >
         { theme==="dark"?<MoonIcon/>:<SunIcon/>}
        </span>
      </Switch>
    </div>
  )
}
