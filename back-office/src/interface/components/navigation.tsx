import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { FC, Fragment, Dispatch, SetStateAction } from "react";
import { navigationData } from "../../data/navigation.data";
import { classNames, clsx } from "../utils/clsx";

import { NavLink } from "react-router-dom";
export const Navigation: FC<{
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>

              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="-mx-2 flex-1 space-y-1">
                    {navigationData.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:text-white hover:bg-gray-800",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
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
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4">
      <div className="flex h-16 shrink-0 items-center justify-center">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
      </div>
      <nav className="mt-8">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {navigationData.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  clsx(
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                    "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                  )
                }
              >
                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span className="sr-only">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};