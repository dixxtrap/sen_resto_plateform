import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { FC, Fragment, Dispatch, SetStateAction } from "react";
import { navigationData } from "../../core/data/navigation.data";
import { classNames, clsx } from "../utils/clsx";
import { NavLink } from "react-router-dom";
import { ProtecterPage } from "./protecter_page";
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "../../core/features/theme.slice";
import {
  useProfileQuery,
  // useSignoutMutation,
} from "../../core/features/security.slice";
export const Navigation: FC<{
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ sidebarOpen, setSidebarOpen }) => {
  const theme=useSelector(selectCurrentTheme)
  const { data: user, isSuccess } = useProfileQuery("");
  return (
    isSuccess&&<Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className={"relative z-50 "+theme} onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/1 " />
        </Transition.Child>

        <div className="fixed inset-0  flex ">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1">
             
              <div className="flex grow flex-col gap-y-5 overflow-y-auto backdrop-blur-lg bg-gradient-to-tr  from-slate-950 to-black  pb-2 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0  sticky top-0   p-2 items-center justify-between">
                {user?.parent && user.parent.imagePath && (
                <img
                alt=""

                className="h-8 md:h-10  bg-gradient-to-tr  backdrop-blur-lg  rounded-md"
                 src={`${user.parent.imagePath}`}
                />
              )}
                 <span className=" text-xl font-bold text-white/0 ">
                {user?.parent?.parent?.id === 1
                  ? user.parent?.name :user?.parent?.id === 1? user?.parent?.name
                  : user?.parent?.parent?.name}
              </span>
                  <button
                    type="button"
                    className="-m-2.5 p-2.5 mx-2"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white/0"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <nav className="flex flex-1 flex-col px-2 ">
                  <ul role="list" className="-mx-2 flex-1 space-y-1 px-2">
                    {navigationData.map((item) => (
                      <ProtecterPage key={`nav_item2_${item.name}`} permissions={item.permissions!}>
                        {" "}
                        <li key={item.name}>
                          <NavLink
                            to={item.href}
                            className={({ isActive }) =>
                              classNames(
                                isActive
                                ? "bg-gradient-to-tr   from-slate-800 to-rose-500/20 text-rose-500"
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
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
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
                    ? "bg-gradient-to-tr   dark:from-slate-800  from-slate-400  to-rose-500/20 text-rose-500"
                    : "dark:text-white/90 text-black/70 hover:text-white hover:bg-gray-700/50",
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
