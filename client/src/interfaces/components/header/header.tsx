import { Disclosure } from "@headlessui/react";
import logo from "/assets/react.svg";
import { constant, links } from "../../../utils/constant";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import { UserDetailIcon } from "./widget/user_detail_icon";

export const Header = () => {
  return (
    <Disclosure as="nav" className=" shadow sticky top-0 backdrop-blur-md z-50">

          <div className=" px-2 sm:px-4 lg:px-4 bg-gradient-to-b from-white to-white/40 ">
            <div className="flex h-16 justify-between">
              <div className="flex px-2 lg:px-0">
                <Link to="/" className="flex flex-shrink-0 items-center">
                  <img alt="logo" src={logo} className="h-10" />
                  <span className="text-lg md:text-2xl font-bold font-serif ml-4  text-kprimary-500">
                    {constant.app_name}
                  </span>
                </Link>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8 md:flex items-center justify-center">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {links.map((item) => <NavLink key={`route_header_${item.name}`}
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
                  )}
                </div>
              </div>
           <UserDetailIcon/>
            </div>
          </div>
    
    </Disclosure>
  );
};
