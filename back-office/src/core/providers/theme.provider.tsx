import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentTheme } from '../features/theme.slice';

const ThemeProvider = ({ children }:{children:React.ReactNode}) => {
  const currentTheme = useSelector(selectCurrentTheme);

  const themeClass = currentTheme;

  return <div className={themeClass+ " h-full w-full dark:bg-slate-900"} >{children}</div>;
};

export default ThemeProvider;