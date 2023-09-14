import { FC, FormEventHandler, ReactNode } from "react";
import { Title } from "./title";
import { Alert } from "./alert_success";
type CustomeFormProps = {
  children?: ReactNode;
  title?: string;
  successMessage?: string;
  errorMessage?: string;


  subTitle?: string;
  validationText?: string;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
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
  errorMessage, 
successMessage,
  onFinish,
}) => {
  return (
    <div className="flex flex-col divide-y gap-y-2 ">
      {title &&<Title title={title} subTitle={subTitle} />}
      <form
        action=""
        className="flex flex-col gap-y-4  pt-10 "
        onSubmit={onSubmit}
      >
        {children}
        <button
          type="submit"
          className=" min-w-[10rem] w-full bg-indigo-600 hover:bg-indigo-500 text-slate-50 py-2.5 rounded-md text-sm font-bold"
        >
          Valider
        </button>
      </form>
      <Alert isOpen={isSuccess} type="succeedded" title="Félicitation" message={successMessage} onClose={onFinish}/>
      <Alert isOpen={isError} type="faillure" title="Ooops!" message={ errorMessage} />
     <Alert isOpen={isLoading} type="loading" title="Traitement..."   onClose={onFinish} message="Patientez un moment "/>
      {/* <Alert isOpen={isSuccess} type="succeedded" title="Félicitation"/> */}
      {/* <Alert isOpen={isError}/> */}
    </div>
  );
};
