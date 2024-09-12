
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
import { AppShell, useMantineColorScheme } from "@mantine/core";
import { useFavicon } from "@mantine/hooks";
import logo from  '/assets/react.ico';
export const BasePage = () => {
 useFavicon(logo)
 useMantineColorScheme().setColorScheme("light");
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
