import { ReactNode, FC } from "react";
import { clsx } from "../utils/clsx";
type InputProps = {
  label?: string;
  name?: string;
  error?: string;
  className?:string;
  children?: ReactNode;
};
export const Input: FC<InputProps> = ({ label, children, name,error, className }) => {
  return (
    <label key={name} htmlFor="" className={clsx("flex gap-y-1 flex-col w-full items-start", className!)} >
      {label&&<span className="block text-md  font-medium text-gray-700">{label}</span>}
      {children}
      {error&&<span className="block text-sm font-medium text-red-700">{error}</span>}

    </label>
  );
};
