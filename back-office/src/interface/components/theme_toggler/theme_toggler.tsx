import { ActionIcon, useMantineColorScheme, useComputedColorScheme, Button } from '@mantine/core';
import classes from './theme_toggler.module.css';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

export const  ThemeToggler=()=> {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Button
    variant="white"
    radius={10}
    color='secondary.4'
    size="md"
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      className="px-3 bg_card"

     
    >
      <SunIcon className={clsx(classes.icon,{"hidden":computedColorScheme==="light"})} />
      <MoonIcon className={clsx(classes.icon,  {"hidden":computedColorScheme==="dark"})}  />
    </Button>
  );
}