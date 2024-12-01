import { Header } from "../../components/header";
import { Outlet } from "react-router-dom";
import { Navigation } from "../../components/navigation";
import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,

} from "@mantine/core";

export default function Public() {
  const [opened, {  close, toggle }] = useDisclosure(false);

  return (
    <AppShell header={{height:'60px'}} classNames={{navbar:'', }} navbar={{width:280, breakpoint:"md",collapsed: { mobile: !opened , },  }}>
      <AppShellHeader>
      
        <Header toggle={toggle} opened={opened} />
      </AppShellHeader>
      <AppShellNavbar >
        <Navigation close={close} opened={true} />
      </AppShellNavbar>
      <AppShellMain >
        <div className="p-2">
        <Outlet></Outlet>
        </div>
       
      </AppShellMain>
    </AppShell>
    // <div className="flex w-full flex-col h-screen">
    //   <Navigation  close={close} opened={opened} />
    //   {/* Static sidebar for desktop */}

    //   <ShortNav open={open} />
    //   <Header open={open} close={close}   />
    //   <main className="lg:pl-20 grow pt-2   dark:bg-transparent  ">
    //     <div className="px-4  sm:px-6   lg:px-8 text-center ">
    //       {/* Main area */}

    //
    //     </div>
    //   </main>
    // </div>
  );
}
