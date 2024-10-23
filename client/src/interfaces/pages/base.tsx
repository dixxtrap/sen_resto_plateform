
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
import { AppShell, useMantineColorScheme } from "@mantine/core";
import { useFavicon, useWindowScroll } from "@mantine/hooks";
import logo from  '/assets/react.ico';
import clsx from "clsx";
import { UserDetailsMobile } from "../components/header/widget/user_detail_icon";
export const BasePage = () => {
 useFavicon(logo)
 useMantineColorScheme().setColorScheme("light");
 const [scroll]=useWindowScroll()
 

  return (
    <AppShell p={0}   classNames={{root:"",header:clsx((scroll.y<100)?"       border-transparent   bg-transparent ":"  bg-white    backdrop-blur-lg border-slate-400/40 border     ")}}  header={{ height: 60 , }}>
     <AppShell.Header>
        {/* <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        /> */}
       
        <Header/>
      </AppShell.Header>
      <AppShell.Main    > 
        <div className="relative h-full  flex flex-col ">
          <div className="">
          
          <div className="min-h-[100vh] ">
          <Outlet />
          </div>
          </div>
        
        <UserDetailsMobile/>
          {/* {inconnue.toString()} */}
        </div>
       
        </AppShell.Main>
     
    </AppShell>
  );
};
