import { FC } from "react";
import { navigationData } from "../../core/data/navigation.data";
import { classNames, clsx } from "../utils/clsx";
import { NavLink } from "react-router-dom";
import { ProtecterPage } from "./protecter_page";
import {
  useProfileQuery,
  // useSignoutMutation,
} from "../../core/features/security.slice";
import { ActionIcon, Tooltip } from "@mantine/core";
import ThemeProvider from "../../core/providers/theme.provider";
import {  IconMenu2 } from "@tabler/icons-react";
export const Navigation: FC<{
  opened: boolean;
  close: () => void;
}> = ({  close }) => {
  const { isSuccess } = useProfileQuery("");

  return (
    isSuccess && (
     
        <ThemeProvider>
          <div className="relative h-[100vh] overflow-hidden dark:bg-zinc-950 flex w-full max-w-xs flex-1">
            <div className="flex grow flex-col gap-y-5 overflow-hidden   pb-2  ">
              <nav className="flex flex-1 flex-col px-2 ">
                <ul className="-mx-2 flex-1 space-y-1 px-2 pt-5">
                  {navigationData.map((item) => (
                    <ProtecterPage
                      key={`nav_item2_${item.name}`}
                      permissions={item.permissions}
                    >
                      {" "}
                      <li key={item.name}>
                        <NavLink
                          to={item.href}
                          onClick={close}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-gradient-to-tr text-white bg-secondary-500  "
                                : " hover:text-black hover:bg-gray-300/50",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 "
                            )
                          }
                        >
                         
                            
                              <item.icon
                              
                                className="h-6 w-6 text-sm shrink-0"
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
     
    )
  );
};
export const ShortNav = ({ open }: { open: () => void }) => {
  return (
    <div className="hidden dark lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto   border-r darkDivider  bg-slate-900 dark:bg-black/90 lg:pb-4">
      <div className="flex h-16 shrink-0  p-2  items-center sticky top-0 justify-center">
        <ActionIcon
          size={40}
          color="secondary.5"
          className=" bg-secondary-500 "
          onClick={open}
        >
          <IconMenu2 className="h-6 w-6 " aria-hidden="true" />
        </ActionIcon>
        {/* <Logo className="bg-gradient-to-tr to-teal-500/20 backdrop-blur-sm from-indigo-500/20 h-14 w-14 p-1 rounded-md" /> */}
      </div>
      <nav className="mt-4">
        <ul className="flex flex-col items-center space-y-1">
          {navigationData.map((item) => (
            <ProtecterPage
              key={`nav_item_${item.name}`}
              permissions={item.permissions}
            >
              <li key={item.name}>
              <Tooltip withArrow label={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    clsx(
                      isActive
                        ? "    ring-1 ring-primary-400  bg-primary-500     dark:text-secondary-400 text-secondary-400"
                        : "dark:text-white/90 text-black/70 hover:text-white hover:bg-secondary-600",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )
                  }
                >
                  {({ isActive }) => (
                   
                      <div>
                        <item.icon
                          className={clsx(
                            "h-6 w-6  shrink-0",
                            isActive ? " text-white" : ""
                          )}
                          aria-hidden="true"
                        />

                        <span className="sr-only">{item.name}</span>
                      </div>
                    
                  )}
                </NavLink>
              </Tooltip>

              </li>
            </ProtecterPage>
          ))}
        </ul>
      </nav>
    </div>
  );
};
