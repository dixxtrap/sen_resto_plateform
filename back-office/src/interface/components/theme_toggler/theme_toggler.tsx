import { useMantineColorScheme, useComputedColorScheme, Button } from '@mantine/core';
import classes from './theme_toggler.module.css';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';

export const  ThemeToggler=()=> {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Button
    variant="filled"
    radius={10}
    color='black'
    size="md"
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      className="px-3  bg-slate-900"

     
    >
      <SunIcon className={clsx(classes.icon,{"hidden":computedColorScheme==="light"})} />
      <MoonIcon className={clsx(classes.icon,  {"hidden":computedColorScheme==="dark"})}  />
    </Button>
  );
}