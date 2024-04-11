import  { FC } from 'react'
type StatusProps = {
  status: boolean,
  activeText?: string,
  inactiveText?: string
}
export const Status: FC<StatusProps> = ({ status, activeText="Activer", inactiveText="Inactiver" }) => {
  return (
    <span className={`inline-flex justify-center text-xs font-semibold text-center rounded-md    px-5 py-1 min-w-[80px]  my-1   ${status ? " bg-secondary-500/20 text-secondary-500 " : "bg-primary-500/20 text-primary-500"}`}>{status ? activeText : inactiveText}</span>
  )
}