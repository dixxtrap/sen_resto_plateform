import {
  UserIcon,
} from "@heroicons/react/24/solid";
import { useProfileQuery } from "../../../../cores/apis/security.slice";
import { BagIcon } from "./bag_icon";
import { NotificationIcon } from "./notification_icon";
import { DialogAlert } from "../../dialog";
import { LoginForm } from "../../login/login_form";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Box, Burger, Button, Drawer, Flex, UnstyledButton } from "@mantine/core";
import { constant, links } from '../../../../utils/constant';
import {Link, NavLink } from "react-router-dom";
import logo from "/assets/react.svg";
import clsx from "clsx";
export const UserDetailsMobile=()=>{
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <> <Drawer offset={0}  closeButtonProps={{
      icon: <Burger opened={opened}  onClick={close} />,
    }} className="top-10"  position={'top'} classNames={{content:"top-10"}} opened={opened} onClose={close} title={  <Link to="/" className="flex  items-end justify-center">
      <img alt="logo" src={logo} className="h-10" />
      <span className="text-lg md:text-2xl font-bold font-serif ml-4  text-kprimary-500">
        {constant.app_name}
      </span>
    </Link>}>
    {/* Drawer content */}
    <Box className="flex  flex-col gap-5">
      {links.map(e=><NavLink to={e.route}  onClick={close}>
        {({isActive})=><UnstyledButton  variant={isActive?"filled":"light"} >
                        <Flex className={clsx("font-bold gap-3", {"text-primary-500":isActive})}>
                        <e.icon  className="size-6"/>
                        <span className="text-2xl">{e.name}</span>
                        </Flex>
                      </UnstyledButton>}
      </NavLink>)}
    </Box>
  </Drawer>

  <Burger opened={opened} className="lg:hidden" onClick={open}></Burger>
  </>)
}
export const UserDetailIcon = () => {
  const {  isSuccess, isError } = useProfileQuery("");
  const [opened, { close, open }] = useDisclosure(false);
 
  return (
    <div className=" lg:ml-4 flex   items-center">
       <UserDetailsMobile/>
      {isSuccess && (<>
       
        <div className="hidden lg:flex gap-3 bg-slate-950 p-2 rounded-lg py-1  ">
          <BagIcon /> <NotificationIcon />
          <Button onClick={open}   p={0}   variant="transparent" >
            <UserIcon  className='size-7 text-white bg-secondary-500 p-0.5 rounded-full' />
          </Button>{" "}
        </div>
         </>
      )}
      {isError && (
        <>
          {" "}
          <ActionIcon onClick={open}    variant="outline"
    size={"lg"}>
            <UserIcon />
          </ActionIcon>{" "}
          <DialogAlert onClose={() => close()} isOpen={opened}>
            <LoginForm close={close} action={() => close()} />
          </DialogAlert>
        </>
      )}

      {/* <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1  mt-2 md:mt-0 text-sm font-semibold leading-6 text-gray-900">
<HeaderIcon onclick={_onclick} icon={<UserIcon className="h-8" />}/>
       
        <span>{`${profile?.data.firstname} ${profile?.data.lastname}`}</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </PopoverButton>

      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-[300px] shrink rounded-xl bg-white p-4 text-sm  md:text-lg font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            {(isError?unlockListMenu: listMenu).map((item) => (
              <Link key={item.name}  to={item.route!} className="flex items-center p-2 hover:text-secondary-400">
              {item.icon}  {item.name}
              </Link> 
            ))}
          </div>
        </PopoverPanel>
      </Transition>
    </Popover> */}
      {/* Profile dropdown */}
    </div>
  );
};
