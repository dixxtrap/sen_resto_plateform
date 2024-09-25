
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
import { AppShell, useMantineColorScheme } from "@mantine/core";
import { useFavicon, useWindowScroll } from "@mantine/hooks";
import logo from  '/assets/react.ico';
import clsx from "clsx";
export const BasePage = () => {
 useFavicon(logo)
 useMantineColorScheme().setColorScheme("light");
 const [scroll,]=useWindowScroll()
  return (
    <AppShell  classNames={{header:clsx("border-gray-400/30 ",{" border-none backdrop-blur-lg bg-transparent ":scroll.y<100})}}  header={{ height: 60 , }}>
     <AppShell.Header>
        {/* <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        /> */}
        <Header/>
      </AppShell.Header>
      <AppShell.Main> 
        <div>
         
          {/* {inconnue.toString()} */}
        </div>
        <Outlet /></AppShell.Main>
     
    </AppShell>
  );
};
