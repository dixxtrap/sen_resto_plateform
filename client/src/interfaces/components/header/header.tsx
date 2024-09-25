import logo from "/assets/react.svg";
import { AppName, constant, links } from "../../../utils/constant";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import { UserDetailIcon } from "./widget/user_detail_icon";
import {  Flex, Text, UnstyledButton } from "@mantine/core";

export const Header = () => {
  return (
  
          <div className=" px-2 sm:px-4 z-[1000] bg-transparent content-center flex w-full  h-full lg:px-4    ">
            <div className="flex h-full w-full  items-center justify-between">
           
                <Link to="/" className="flex  items-end justify-center">
                  <img alt="logo" src={logo} className="h-10" />
                  <Text  className="text-lg md:text-4xl font-bold font-serif ml-4  ">
                    {AppName[0]}
                   
                  </Text>
                  <Text  c={"secondary.8"} className="text-slate-800 mx-3 font-serif text-xl md:text-5xl"> {AppName[1]}</Text>
                </Link>
              <div>
                {/* <Text>by <span className="text-primary-600 font-bold">NefertiSys</span> Dizitalization  company</Text> */}
              </div>
                <div className="hidden  self-center  lg:ml-6 bg-red-700  ">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {links.map((item) =>{
                    // const Icon=item.icon;
                    return ( <NavLink key={`route_header_${item.name}`}
                      className={({ isActive, isPending }) =>
                        clsx("text-xl leading-3 font-bold", {
                          "text-primary-600 border-b-4 border-primary-500": isActive,
                          "animate-pulse duration-75": isPending,
                        })
                      }
                      to={item.route}
                    >
                      {({isActive})=><UnstyledButton  variant={isActive?"filled":"light"} >
                        <Flex className="font-bold">
                        {/* <Icon  className="size-6"/> */}
                        <span className="text-2xl">{item.name}</span>
                       
                        </Flex>
                     
                      </UnstyledButton>}
                     
                    </NavLink>
                 )} )}
                
             
              </div>
           <UserDetailIcon/>
            </div>
          </div>
    
  );
};
