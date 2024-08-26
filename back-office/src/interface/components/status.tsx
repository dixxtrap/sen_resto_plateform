import { Badge } from '@mantine/core'
import  { FC } from 'react'
type StatusProps = {
  status: boolean,
  activeText?: string,
  inactiveText?: string
}
export const Status: FC<StatusProps> = ({ status, activeText="Activer", inactiveText="Inactiver" }) => {
  return (
    <Badge variant="light" color={status?'secondary':"primary"} radius={'xs'} className={`font-semibold  rounded-md     my-1   ${status ? " bg-secondary-500/20 text-secondary-500 " : "bg-primary-500/20 text-primary-500"}`}>{status ? activeText : inactiveText}</Badge>
  )
}