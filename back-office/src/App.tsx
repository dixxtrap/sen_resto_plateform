import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import ThemeProvider from "./core/providers/theme.provider";
import { Provider } from "react-redux";
import store from "./core/features";

import { RouterProvider } from "react-router-dom";
import { router } from "./interface/router";
import {  MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { APP_THEME } from './theme';
import { Notifications } from '@mantine/notifications';
import { initializeSocket } from './core/features/get_socket';

export  const App = () => {
  initializeSocket("http://localhost:3000/v1");
  return (
    <MantineProvider theme={APP_THEME}>
       <Notifications />
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
