
import {  CakeIcon, ChevronDownIcon, GiftIcon, HomeModernIcon, StarIcon, UserIcon } from '@heroicons/react/24/solid'
import { HeaderIcon } from './header_icon';
import { Link } from 'react-router-dom';
import {  Popover, Transition, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useProfileQuery } from '../../../../cores/apis/security.slice';
import { BagIcon } from './bag_icon';
import { NotificationIcon } from './notification_icon';
import {  useState } from 'react';
import { DialogAlert } from '../../dialog';
import { LoginForm } from '../../login/login_form';
const unlockListMenu=[
 

 {name:'Produits',icon:<HeaderIcon icon={<CakeIcon className='h-8'/>}/>, route:'product'}, 
 { icon:<HeaderIcon icon={<HomeModernIcon className='h-8'/>}/>,name:'Restaurant', route:'notification',},
//  {name:'Favoris', route:'favoris',}
];
const listMenu=[
    {name:'Commandes',icon:<BagIcon></BagIcon>, route:'order'},
{ icon:<NotificationIcon/>,name:'Notification', route:'notification',},
{name:'Favoris', icon:<HeaderIcon icon={<StarIcon className='h-8'/>}/>,route:'favoris',},
{name:'Caddeaux', icon:<HeaderIcon icon={<GiftIcon className='h-8'/>}/>,route:'favoris',},

...unlockListMenu
//  {name:'Favoris', route:'favoris',}
];

export const UserDetailIcon = () => {
    const {data:profile,isSuccess, isError }=useProfileQuery('')
    const [showLogin,setShowLogin]= useState<boolean>(false)
    const _onclick=()=>{
isError&&setShowLogin(true);
    }  
     return (
    <div className=" lg:ml-4 lg:flex lg:items-center">
   
    {isSuccess&& <div className='hidden lg:block'><BagIcon/> <NotificationIcon/></div>}
   { isError && <DialogAlert   onClose={()=> setShowLogin(false)} isOpen={showLogin}>
        <LoginForm action={()=>setShowLogin(false)}/></DialogAlert>}
     
        <Popover className="relative">
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
    </Popover>
    {/* Profile dropdown */}
  </div>
     
  )
}
