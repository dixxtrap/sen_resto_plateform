
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route";
import store from "./cores/apis/index.store";
import { Provider } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import ThemeProvider from "./cores/theme/theme.provider";

function App() {
  const methods = useForm();
  return (
    <Provider store={store}>
  <ThemeProvider>
      <FormProvider {...methods}>
      <RouterProvider router={router} />
      </FormProvider>
      </ThemeProvider>

    </Provider>
  );
}

export default App;
