import { Dialog, FocusTrap, Transition } from '@headlessui/react'
import { CheckIcon, LightBulbIcon, SunIcon } from '@heroicons/react/24/outline'
import { Fragment ,FC, ReactNode} from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../../core/features/theme.slice'
type AlertProps={
        title?:string,
        message?:string,
        isOpen?:boolean,
        type?:"succeedded"|"loading"|"faillure"|"info"
        onClose?:(()=>void)
}
export const Alert :FC<AlertProps> =   ({isOpen=true,onClose=()=>{
        console.log("------------------on close---------------")
}, message, title, type}) => {

  const theme=useSelector(selectCurrentTheme);

// const nav=useNavigate();
  return (
    <>
   
  <Transition show={isOpen}   as={Fragment}>
      <Dialog as="div"  className={"relative z-[10000] " + theme}  onClose={onClose}>
        <Transition.Root
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-md bg-opacity-75 transition-opacity" />
        </Transition.Root>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-black/90 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  {type==="succeedded"&&<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>}
                  {type==="loading"&&<div className="mx-auto animate-spin flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
                    <SunIcon className="h-6 w-6 text-sky-600" aria-hidden="true" />
                  </div>}
                  {type==="info"&&<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
                    <LightBulbIcon className="h-6 w-6 text-sky-600" aria-hidden="true" />
                  </div>}
                  {type==="faillure"&&<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                    <CheckIcon className="h-6 w-6 text-rose-600" aria-hidden="true" />
                  </div>}
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 dark:text-kdark-text">
                    {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-400 dark:text-kdark-text">
                      {message}
                      </p>
                    </div>
                  </div>
                </div>
                <FocusTrap />
              {
               (  type==="faillure")&&
               <div className="flex items-center w-fit">
               <button
                 type="button"
                 className="button primary"
                 onClick={onClose}
               >
                 Fermer
               </button>
               {/* <button
                 type="button"
                 className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                 onClick={()=>{nav(-1)}}
               
               >
                 Retour
               </button> */}
             </div>
              }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
   
    </>
  )
}

export type DialogProps={
  children:ReactNode;
   isOpen:boolean;
    onClose:()=>void
}

export const DialogAlert :FC<DialogProps> =   ({isOpen=true,onClose,children}) => {
  const theme=useSelector(selectCurrentTheme);
  
return (
 
  <Transition show={isOpen}   as={Fragment}>
      <Dialog as="div"  className={"relative z-[10000] " + theme}  onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-md bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-white dark:bg-black/90 px-4 pb-2 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-4">
          
              {children}
             
               
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  

)
}
