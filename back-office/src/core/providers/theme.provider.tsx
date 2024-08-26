import React from 'react';
import { useComputedColorScheme } from '@mantine/core';

const ThemeProvider = ({ children }:{children:React.ReactNode}) => {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  return <div className={computedColorScheme + "  dark:bg-slate-900"} >{children}</div>;
};

export default ThemeProvider;