import { XMarkIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { navigationData } from "../../core/data/navigation.data";
import { classNames, clsx } from "../utils/clsx";
import { NavLink } from "react-router-dom";
import { ProtecterPage } from "./protecter_page";

import {
  useProfileQuery,
  // useSignoutMutation,
} from "../../core/features/security.slice";
import { ActionIcon, Drawer } from "@mantine/core";
import ThemeProvider from "../../core/providers/theme.provider";
export const Navigation: FC<{
 
  opened: boolean;
  close: ()=>void;
  
}> = ({ opened,close }) => {
  const { data: user, isSuccess } = useProfileQuery("");
  const AppDrawerHeader = () => <div className="flex  px-2 w-['100%']  h-[60px] bg-slate-900   items-center justify-between">
    {user?.parent && user.parent.imagePath && (
      <img
        alt=""

        className="h-8 md:h-10  bg-gradient-to-tr  backdrop-blur-lg  rounded-md"
        src={`${user.parent.imagePath}`}
      />
    )}
    <span className=" text-xl font-bold text-white/0 ">
      {user?.parent?.parent?.id === 1
        ? user.parent?.name : user?.parent?.id === 1 ? user?.parent?.name
          : user?.parent?.parent?.name}
    </span>
    <ActionIcon
      type="button"
      color="secondary.4"
      className="  p-2.5 "
      onClick={close}
    >
      <span className="sr-only">Close sidebar</span>
      <XMarkIcon
        className="h-6 w-6 text-white"
        aria-hidden="true"
      />
    </ActionIcon>
  </div>;
  return (
    isSuccess && <Drawer
      
      title={<AppDrawerHeader/> }
      withCloseButton={false} offset={8}
      transitionProps={{ transition: 'rotate-left', duration: 150, timingFunction: 'linear' }}
      classNames={{body:'bg-black', header:'bg-black ring-secondary-500 ring', content:'  box-content border border-secondary-400/30  shadow-lg shadow-green-500 ring-secondary-500'}}
      styles={{ header:{padding:0, margin:0,width:'100%', height:'50px', background:'black'},title:{padding:0,width:'100%', height:'100%', margin:0},content: { padding: 0, borderRadius:12}, body: { padding: 0, paddingTop:0, height: '100vh', } }} opened={opened} size={'xs'}  w={300} onClose={close} >
      <ThemeProvider>
      <div className="relative h-[100vh]  flex w-full max-w-xs flex-1">
             
             <div className="flex grow flex-col gap-y-5 overflow-y-auto backdrop-blur-lg bg-gradient-to-tr  from-slate-950 to-black  pb-2 ring-1 ring-white/10">
              
               <nav className="flex flex-1 flex-col px-2 ">
                 <ul role="list" className="-mx-2 flex-1 space-y-1 px-2 pt-5">
                   {navigationData.map((item) => (
                     <ProtecterPage key={`nav_item2_${item.name}`} permissions={item.permissions!}>
                       {" "}
                       <li key={item.name}>
                         <NavLink
                           to={item.href}
                           className={({ isActive }) =>
                             classNames(
                               isActive
                               ? "bg-gradient-to-tr   from-slate-800 to-primary-500/20 text-primary-500"
                               : "text-white/90 hover:text-white hover:bg-gray-700/50",
                               "group flex gap-x-3 rounded-md p-2 text-sm leading-6 "
                             )
                           }
                         >
                           <item.icon
                             className="h-6 w-6  text-sm shrink-0"
                             aria-hidden="true"
                           />
                           {item.name}
                         </NavLink>
                       </li>
                     </ProtecterPage>
                   ))}
                 </ul>
               </nav>
             </div>
           </div>
       </ThemeProvider>
    </Drawer>
  );
};
export const ShortNav = () => {
  const { data: user,  } = useProfileQuery("");
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto  border-r darkDivider  bg-slate-100 dark:bg-black/90 lg:pb-4">
      <div className="flex h-16 shrink-0  p-2  items-center sticky top-0 justify-center">
      {user?.parent && user.parent.imagePath && (
                <img
                alt=""
                className=" h-8 md:h-10  rounded-md backdrop-blur-lg"
                 src={`${user.parent.imagePath}`}
                />
              
              )}
              
        {/* <Logo className="bg-gradient-to-tr to-teal-500/20 backdrop-blur-sm from-indigo-500/20 h-14 w-14 p-1 rounded-md" /> */}
      </div>
      <nav className="mt-4">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {navigationData.map((item) => (
          <ProtecterPage key={`nav_item_${item.name}`} permissions={item.permissions!}>
              <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  clsx(
                    isActive
                    ? "bg-gradient-to-tr   dark:from-slate-800 ring-1 ring-secondary-500/60  from-slate-400/20 via-secondary-500/20  to-secondary-500/40 dark:text-secondary-500 text-secondary-700"
                    : "dark:text-white/90 text-black/70 hover:text-white hover:bg-secondary-600",
                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  )
                }
              >
                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span className="sr-only">{item.name}</span>
              </NavLink>
            </li>
          </ProtecterPage>
          ))}
        </ul>
      </nav>
    </div>
  );
};
