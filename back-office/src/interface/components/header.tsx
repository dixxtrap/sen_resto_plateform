import { useEffect } from "react";

import { Menu, Transition } from "@headlessui/react";
import { clsx } from "../utils/clsx";
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { NavLink, Navigate } from "react-router-dom";
import { FC, Dispatch, SetStateAction, Fragment } from "react";
import {
  useProfileQuery,
  useSignoutMutation,
} from "../../core/features/security.slice";
import { Alert } from "./alert_success";
import { Img } from "./image_updatable";
export const Header: FC<{
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setSidebarOpen }) => {
  const [
    signout,
    {
      isError: isDisconnecteError,
      isLoading: isDisconnecteLoading,
      isSuccess: isDisconnecteSuccess,
    },
  ] = useSignoutMutation();
  const {
    data: user,
    currentData,
    isSuccess,
    isError,
    refetch,
  } = useProfileQuery("");
  useEffect(() => {
    if (!user) {
      refetch();
    }
  }, [refetch, user]);
  return (
    <>
      <Alert isOpen={isDisconnecteLoading} type="loading" />
      <Alert isOpen={isDisconnecteError} type="faillure" />
      {isDisconnecteSuccess && <Navigate to={"/"} />}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        {user && (
          <>
            <button
              type="button"
              className="-m-2.5 p-2.5  lg:pl-20 text-gray-700 "
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Separator */}
            <div className="h-6 w-px bg-gray-900/10 " aria-hidden="true" />

            <div className="grow flex items-center gap-x-3">
              
                <Img
                  className="h-8  md:h-10 rounded-md"
                  hasImg={user!.company!.profile!.size! > 0}
                  imgId={
                    user!.company!.id === 1
                      ? user?.restaurant?.profile!.id ??
                        user?.company!.profile?.id
                      : user?.company!.profile?.id
                  }
                />
              
              <span className="text-indigo-600 text-xl font-bold">
                {user?.company?.id == 1
                  ? user.restaurant?.name ?? user?.company?.name
                  : user?.company?.name}
              </span>
            </div>

            <div className="flex  gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        {user?.firstname} {user?.lastname}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5  origin-top-right rounded-md bg-white py-2 shadow-lg shadow-indigo-800/10 ring-1 ring-slate-700/20 focus:outline-none ring-inset">
                      <Menu.Item key={"email"}>
                        <span
                          className={clsx(
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          {user?.email}
                        </span>
                      </Menu.Item>
                      <Menu.Item key={"email"}>
                        <span
                          className={clsx(
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          {user?.company?.phone}
                        </span>
                      </Menu.Item>
                      <button
                        className=" block px-3 py-1 text-sm leading-6 text-gray-900"
                        onClick={() => {
                          signout("");
                        }}
                      >
                        {" "}
                        Deconnexion
                      </button>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
