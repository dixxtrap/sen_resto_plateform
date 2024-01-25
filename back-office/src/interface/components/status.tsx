import  { FC } from 'react'
type StatusProps = {
  status: boolean,
  activeText?: string,
  inactiveText?: string
}
export const Status: FC<StatusProps> = ({ status, activeText="Activer", inactiveText="Inactiver" }) => {
  return (
    <span className={`inline-flex justify-center text-xs font-semibold text-center rounded-full  text-white   px-5 py-1 min-w-[80px]  my-1 outline-1  outline-double outline-offset-1   ${status ? " outline-secondary-500/50 bg-secondary-500 " : " outline-primary-500/50 bg-primary-500"}`}>{status ? activeText : inactiveText}</span>
  )
}