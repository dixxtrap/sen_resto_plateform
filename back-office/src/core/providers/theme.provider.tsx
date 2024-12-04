import React from 'react';
import { useComputedColorScheme } from '@mantine/core';

const ThemeProvider = ({ children }:{children:React.ReactNode}) => {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  return <div className={computedColorScheme + "  "} >{children}</div>;
};

export default ThemeProvider;