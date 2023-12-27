import React, { FC } from 'react'
type StatusProps = {
  status: boolean,
  activeText?: string,
  inactiveText?: string
}
export const Status: FC<StatusProps> = ({ status, activeText="active", inactiveText="inactive" }) => {
  return (
    <span className={`inline-flex justify-center text-xs font-semibold text-center rounded-full  px-5 py-1 min-w-[80px]  my-1 ring-2 ring-inset  ${status ? "ring-teal-200/50 text-teal-50 bg-teal-500 dark:bg-teal-800/90" : "ring-red-100 text-red-50 bg-red-500"}`}>{status ? activeText : inactiveText}</span>
  )
}