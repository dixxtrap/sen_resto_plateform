import { FC, FormEventHandler, ReactNode, useRef, useState } from "react";
import { Title } from "./title";

import { Navigate } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Alert, DialogAlert } from "./dialog";
import { getWsMessage } from "../../cores/apis/error_transformer";
type CustomeFormProps = {
  children?: ReactNode;
  title?: string;
  successMessage?: string;
  error?: unknown;
confirmeBefore?:boolean;
  subTitle?: string;
  validationText?: string;
  nextText?: string;
  btnClassName?: string;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  successPath?:string;
  confirmationMessage?:string;
  onFinish?:()=>void;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
};
export const CustomForm: FC<CustomeFormProps> = ({
  children,
  onSubmit,
  title,
  subTitle,
  isSuccess,
  isError,
  isLoading,
  error,
  successPath, 
successMessage,
confirmeBefore=false,
confirmationMessage,
  onFinish,
  validationText,
 nextText,btnClassName
}) => {
  const[isOpen ,setIsOpen ]=useState<boolean>(false);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className={btnClassName?"":"flex flex-col divide-y darkDivider gap-y-2 "}>
      {isSuccess && successMessage!="." && <Navigate to={successPath??".."} />}
      {title &&<Title title={title} subTitle={subTitle} />}
      <form
        action=""
        className={btnClassName?"":"flex flex-col gap-y-4  pt-10 "}
        onSubmit={onSubmit}
      >
        {children}
        {isOpen&& <DialogAlert  isOpen={isOpen} onClose={()=>{console.log("==============close=======")} }>
       <div className="flex flex-col ">
        <ExclamationTriangleIcon className="text-primary-500 h-20"/>
       <span className="text-lg mx-auto font-bold">Confirmation</span>
        <span className="text-lg mx-auto">{confirmationMessage??'Voulez vous poursuivre cette action'}</span>
        <div className="flex justify-between">
        <button
          onClick={()=>{ setIsOpen(false);}}
          className=" button primary"
        >
          Non
        </button>
        <button
          type="submit"
        onClick={()=>{
          setIsOpen(false);
      if(    firstButtonRef.current){
        firstButtonRef.current?.click();
      }
        }}
          className=" button secondary"
        >
          Oui
        </button>
        </div>
       
       </div>
        </DialogAlert>}
     {  confirmeBefore? <button
     type="button"
        onClick={()=>setIsOpen(true)}
          className={btnClassName??" min-w-[10rem] w-full bg-primary-500 hover:bg-primary-500/90 text-slate-50 py-2.5 rounded-md text-sm font-bold"}
        >
          {nextText??'Suivant'}
        </button>:<button
       
        
          type="submit"
          className={btnClassName??" min-w-[10rem] w-full bg-primary-500 hover:bg-primary-500/90 text-slate-50 py-2.5 rounded-md text-sm font-bold"}
        >
          {validationText??'Valider'}
        </button>}
        <button  hidden={true}  type="submit" ref={firstButtonRef}></button>
      </form>
  
    { isSuccess&& <Alert isOpen={isSuccess} type="succeedded" title="Félicitation" message={successMessage} onClose={onFinish}/>}
     {isError&& <Alert isOpen={isError} type="faillure" title="Ooops!" message={ getWsMessage(error)}  onClose={onFinish} />}
    { isLoading&&<Alert isOpen={isLoading} type="loading" title="Traitement..."   onClose={onFinish} message="Patientez un moment "/>}
 
      {/* <Alert isOpen={isSuccess} type="succeedded" title="Félicitation"/> */}
      {/* <Alert isOpen={isError}/> */}
    </div>
  );
};
