import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import ThemeProvider from "./core/providers/theme.provider";
import { Provider } from "react-redux";
import store from "./core/features";

import { RouterProvider } from "react-router-dom";
import { router } from "./interface/router";
import {  MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { APP_THEME } from './theme';

export  const App = () => {

  return (
    <MantineProvider theme={APP_THEME}>
      <DatesProvider   settings={{ consistentWeeks: true }}>
    <Provider store={store}>
      <ThemeProvider>
      
          <div className="App   bg-white dark:text-slate-100 darkBg  ">
          <RouterProvider router={router} />
          </div>

      </ThemeProvider>

    </Provider>
    </DatesProvider>
    </MantineProvider>
  );
};
