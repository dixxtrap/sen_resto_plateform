import { FormProvider, useForm } from "react-hook-form";
import ThemeProvider from "./core/providers/theme.provider";
import { Provider } from "react-redux";
import store from "./core/features";
import Public from "./interface/pages/public/public";
import { RouterProvider } from "react-router-dom";
import { router } from "./interface/router";
import { FocusTrap } from "@headlessui/react";

export  const App = () => {
  const methods = useForm();
  return (
    <FocusTrap>
    <Provider store={store}>
      <ThemeProvider>
        <FormProvider {...methods}>
          <div className="App   bg-white dark:text-slate-100 darkBg  ">
          <RouterProvider router={router} />
          </div>
        </FormProvider>
      </ThemeProvider>
    </Provider>
    </FocusTrap>
  );
};
