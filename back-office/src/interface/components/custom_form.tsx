import { FC, FormEventHandler, ReactNode } from "react";
import { Title } from "./title";
type CustomeFormProps = {
  children?: ReactNode;
  title?: string;
  subTitle?: string;
  validationText?: string;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
};
export const CustomForm: FC<CustomeFormProps> = ({
  children,
  onSubmit,
  title,
  subTitle,
}) => {
  return (
    <div className="flex flex-col divide-y gap-y-2 ">
      <Title title={title} subTitle={subTitle} />
      <form
        action=""
        className="flex flex-col gap-y-4  pt-10 "
        onSubmit={onSubmit}
      >
        {children}
        <button
          type="submit"
          className=" min-w-[10rem] w-min bg-indigo-600 hover:bg-indigo-500 text-slate-50 py-2.5 rounded-md text-sm font-bold"
        >
          Valider
        </button>
      </form>
    </div>
  );
};
