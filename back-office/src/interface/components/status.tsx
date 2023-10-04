import React, { FC } from 'react'
type StatusProps = {
  status: boolean,
  activeText: string,
  inactiveText: string
}
export const Status: FC<StatusProps> = ({ status, activeText, inactiveText }) => {
  return (
    <span className={`inline-flex items-center text-sm rounded-md  px-5 py-1   ring-1 ring-inset  ${status ? "ring-teal-600/20 text-teal-700 bg-teal-50" : "ring-pink-600/20 text-pink-700 bg-pink-50"}`}>{status ? activeText : inactiveText}</span>
  )
}