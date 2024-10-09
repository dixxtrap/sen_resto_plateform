import {
  ArrowLongRightIcon,
  
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import {
  securityApi,
  useProfileQuery,
} from "../../../../cores/apis/security.slice";
import { BagIcon, BagIconMobile } from "./bag_icon";
import { NotificationIcon } from "./notification_icon";
import { LoginForm } from "../../login/login_form";
import {

  Button,
  UnstyledButton,

  Menu,
  rem,
} from "@mantine/core";
import {  Navigate, NavLink } from "react-router-dom";
import  HomeIconSolid from "@heroicons/react/24/solid/HomeIcon";
import  HomeIcon from "@heroicons/react/24/outline/HomeIcon";

import MapPinIcon from "@heroicons/react/24/outline/MapPinIcon";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import clsx from "clsx";

export const UserDetailsMobile = () => {

  // const profile = useProfileQuery("");
  return (
    <div className="sticky bg-white z-[1000] bottom-0 md:hidden  pt-2 w-screen px-5 ring-1  ring-gray-800/10">
      <div className="flex justify-between">
        <NavLink to={""}>
        {({isActive})=><div className={clsx("bottom_nav_item",)}>
          <div className={clsx("bottom_nav_item_icon",{"active":isActive})}>
          {isActive?<HomeIconSolid className="size-6"/>:<HomeIcon className="size-6"/>}

          </div>
          <span className="text-xs">Home</span>
          </div>}
        </NavLink>
      
          <div className="bottom_nav_item">
            <div className={clsx("bottom_nav_item_icon",{"active":false})} >
            <MapPinIcon className="size-6"/>

            </div>
          <span className="text-xs">Localisation</span>
          </div>
          
         <BagIconMobile/>
          
          
          
          <div className="bottom_nav_item">
          <div className={clsx("bottom_nav_item_icon",{"active":false})} >
          <UserCircleIcon className="size-6"/>

            </div>
     
          <span className="text-xs">Profile</span>
          </div>
      </div>
          
      </div>
  );
};
export const UserDetailIcon = () => {
  const { data: profile, ...profileState } = useProfileQuery("");
  const [logout, logoutStatus] = securityApi.useLogoutMutation();


  return (
    <div className=" lg:ml-4 flex  relative  items-center">
      {logoutStatus.isSuccess && <Navigate to="/" />}
      {/* <UserDetailsMobile /> */}
      {profileState.isSuccess && (
        <>
          <div className="hidden md:flex relative  border-b-2  border-r-2 bg-white/60 backdrop-blur-xl items-strech  gap-8 p-2  rounded-lg py-1  ">
            <BagIcon />
            <NotificationIcon />
            <Menu
              shadow="md"
              offset={10}
              classNames={{
                label: "p-1 m-0 ",
                dropdown: " absolute z-[2000] backdrop-blur-sm",
              }}
              withArrow
              position="bottom-end"
              width={200}
            >
              <Menu.Target>
                <UnstyledButton className="content-center">
                  <UserIcon className="size-7 text-white bg-slate-900 p-1 rounded-full" />
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown onScroll={undefined}>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item
                  leftSection={
                    <UserIcon style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  {` ${profile?.data.firstname} ${profile?.data.lastname}`}
                </Menu.Item>

                <Menu.Item
                  leftSection={
                    <PhoneIcon style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  {profile?.data.phone}
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>

                <Menu.Item
                  onClick={() => logout()}
                  color="red"
                  leftSection={
                    <ArrowLongRightIcon
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  }
                >
                  Deconnexion
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </>
      )}
  
      { (
    profileState.isSuccess==false&&
          <LoginForm
            component={
              <Button radius={30}>
                Connexion
              </Button>
            }
            close={close}
            action={() => close()}
          />
       
      )}
    </div>
  );
};
