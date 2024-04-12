import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "/assets/react.svg";
import { constant, links } from "../../utils/constant";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import { useProfileQuery } from "../../cores/apis/security.slice";

export const Header = () => {
  const { data: profile } = useProfileQuery("");
  return (
    <Disclosure as="nav" className=" shadow sticky top-0 backdrop-blur-md z-50">
      {({ open }) => (
        <>
          <div className=" px-2 sm:px-4 lg:px-4 bg-gradient-to-b from-white to-white/40 ">
            <div className="flex h-16 justify-between">
              <div className="flex px-2 lg:px-0">
                <Link to="/" className="flex flex-shrink-0 items-center">
                  <img src={logo} className="h-10" />
                  <span className="text-2xl font-bold font-serif ml-4  text-kprimary-500">
                    {constant.app_name}
                  </span>
                </Link>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8 md:flex items-center justify-center">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {links.map((item) => (
                    <NavLink
                      className={({ isActive, isPending }) =>
                        clsx("text-xl font-bold", {
                          "text-kprimary-400": isActive,
                          "animate-pulse duration-75": isPending,
                        })
                      }
                      to={item.route}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* <div className="flex items-center lg:hidden"> */}
              {/* Mobile menu button */}
              {/* <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"> */}
              {/* <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span> */}
              {/* {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )} */}
              {/* </Disclosure.Button>
              </div> */}

              <div className=" lg:ml-4 lg:flex lg:items-center">
                <div className="hidden lg:flex">{profile?.firstname} </div>
                <button
                  type="button"
                  className="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-4 flex-shrink-0">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {/* <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      /> */}

                      <div className="flex items-center ">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset">
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          Commande(s) en cours
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          Se déconnecter
                        </a>
                      </Menu.Item>
                      {/*<Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item> */}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};
