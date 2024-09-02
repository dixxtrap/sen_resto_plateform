
import "./App.css";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route";
import store from "./cores/apis/index.store";
import { Provider } from "react-redux";
import ThemeProvider from "./cores/theme/theme.provider";
import { MantineProvider } from "@mantine/core";
import { APP_THEME } from "./theme";
import { useFavicon } from "@mantine/hooks";

function App() {
  return (
    <MantineProvider theme={APP_THEME}>
    <Provider store={store}>
  <ThemeProvider>
      
      <RouterProvider router={router} />
    
      </ThemeProvider>

    </Provider>
    </MantineProvider>
  );
}

export default App;
