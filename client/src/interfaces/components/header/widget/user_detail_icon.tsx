
import {  ChevronDownIcon, UserIcon } from '@heroicons/react/24/solid'
import { HeaderIcon } from './header_icon';
import { Link, useNavigate } from 'react-router-dom';
import {  Menu, Popover, Transition, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useProfileQuery } from '../../../../cores/apis/security.slice';
import { BagIcon } from './bag_icon';
import { NotificationIcon } from './notification_icon';
import { Fragment, useState } from 'react';
import { DialogAlert } from '../../dialog';
import { LoginForm } from '../../login/login_form';

export const UserDetailIcon = () => {
    const {data:profile,isSuccess, isLoading, isError }=useProfileQuery('')
    const [showLogin,setShowLogin]= useState<boolean>(false)
    const nav=useNavigate();
    const _onclick=()=>{
isError&&setShowLogin(true);
    }  
  return (
    <div className=" lg:ml-4 lg:flex lg:items-center">
    <div className="hidden lg:flex">{profile?.data.firstname} </div>
    {isSuccess&& <><BagIcon/> <NotificationIcon/></>}
   { isError && <DialogAlert   onClose={()=> setShowLogin(false)} isOpen={showLogin}>
        <LoginForm action={()=>setShowLogin(false)}/></DialogAlert>}
     
        <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
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
            {[{name:'Mes Commandes',icon:<BagIcon></BagIcon>, route:'order'}, {name:'List des Produits',icon:<NotificationIcon/>, route:'product'}, {name:'notification', rouet:'notification',},{name:'Favoris', route:'favoris',}].map((item) => (
              <Link key={item.name}  to={item.route!} className="flex items-center p-2 hover:text-secondary-400">
              {item.icon}  {item.name}
              </Link> 
            ))}
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
    {/* Profile dropdown */}
    <Menu as="div" className="relative ml-4 flex-shrink-0">
      <div>
        
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 divider-y origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
            <div
            
              className="block px-4 py-2 text-sm text-gray-700"
            >
            {`${profile?.data.firstname} ${profile?.data.lastname}`}
            </div>
          </Menu.Item>
          <Menu.Item>
            <div
            
              className="block px-4 py-2 text-sm text-gray-700"
            >
            {`${profile?.data.phone}`}
            </div>
          </Menu.Item>
          <Menu.Item>
            <div
 className="block px-4 py-2 text-sm text-gray-700"
            >
              Commande(s) en cours
            </div>
          </Menu.Item>
          <Menu.Item>
            <div
             
              className="block px-4 py-2 text-sm text-gray-700"
            >
              Se déconnecter
            </div>
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
     
  )
}
