
import { Header } from "../../components/header";
import { Outlet } from "react-router-dom";
import { Navigation, ShortNav } from "../../components/navigation";
import { useDisclosure } from "@mantine/hooks";

export default function Public() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
      <div className="flex w-full flex-col h-screen">
        <Navigation  close={close} opened={opened} />
        {/* Static sidebar for desktop */}

        <ShortNav open={open} />
        <Header open={open} close={close}   />
        <main className="lg:pl-20 grow pt-2   dark:bg-transparent  ">
          <div className="px-4  sm:px-6   lg:px-8 text-center ">
            {/* Main area */}
            
            <Outlet></Outlet>
          </div>
        </main>
      </div>
  );
}
