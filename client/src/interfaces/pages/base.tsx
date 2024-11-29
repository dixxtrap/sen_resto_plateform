import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
import { AppShell, useMantineColorScheme } from "@mantine/core";
import { useFavicon,   } from "@mantine/hooks";
import logo from "/assets/react.ico";
import { UserDetailsMobile } from "../components/header/widget/user_detail_icon";
export const BasePage = () => {
  useFavicon(logo);
  useMantineColorScheme().setColorScheme("light");
  

  return (
    <AppShell
      p={0}
     
      header={{ height: 60 }}
    >
      <AppShell.Header>
        {/* <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        /> */}

        <Header />
      </AppShell.Header>
      <AppShell.Main className="max-h-[calc(100vh - 160px)]">
        
              <Outlet />
              

          {/* {inconnue.toString()} */}
        
      </AppShell.Main>
      <AppShell.Header className="bottom-0 sticky w-full md:hidden  ">
        <UserDetailsMobile />
      </AppShell.Header>
    </AppShell>
  );
};
