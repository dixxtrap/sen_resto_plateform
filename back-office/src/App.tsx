import { FormProvider, useForm } from "react-hook-form";
import ThemeProvider from "./core/providers/theme.provider";
import { Provider } from "react-redux";
import store from "./core/features";

import { RouterProvider } from "react-router-dom";
import { router } from "./interface/router";

export  const App = () => {
  const methods = useForm();
  return (
    
    <Provider store={store}>
      <ThemeProvider>
        <FormProvider {...methods}>
          <div className="App   bg-white dark:text-slate-100 darkBg  ">
          <RouterProvider router={router} />
          </div>
        </FormProvider>
      </ThemeProvider>
    </Provider>
   
  );
};
