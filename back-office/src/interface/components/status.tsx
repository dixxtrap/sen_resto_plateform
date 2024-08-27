import { Badge } from '@mantine/core'
import  { FC } from 'react'
type StatusProps = {
  status: boolean,
  activeText?: string,
  inactiveText?: string
}
export const Status: FC<StatusProps> = ({ status, activeText="Activer", inactiveText="Inactiver" }) => {
  return (
    <Badge variant="light" color={status?'green':"red"} radius={'xs'} className={`font-semibold  rounded-md     my-1   ${status ? "  " : ""}`}>{status ? activeText : inactiveText}</Badge>
  )
}