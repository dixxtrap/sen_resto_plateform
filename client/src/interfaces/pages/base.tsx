
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
import { AppShell } from "@mantine/core";
import { useFavicon } from "@mantine/hooks";

export const BasePage = () => {
 useFavicon('/assets/react.ico')

  return (
    <AppShell   header={{ height: 60 }}>
     <AppShell.Header>
        {/* <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        /> */}
        <Header/>
      </AppShell.Header>
      <AppShell.Main> <Outlet /></AppShell.Main>
     
    </AppShell>
  );
};
