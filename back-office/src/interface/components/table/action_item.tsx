import { EyeIcon, PencilIcon } from '@heroicons/react/24/solid'
import { ActionIcon, Tooltip, UnstyledButton } from '@mantine/core'
import { Link } from 'react-router-dom'
export const TableActionItemFonction = ({label, onClick}:{label:string,onClick?:()=>void}) => {
  return (
    <Tooltip  withArrow label={label} >
   
      <ActionIcon onClick={onClick} variant="light" className='text-secondary-500' color="secondary.5" size={"md"} p={3}>
<PencilIcon/>
        </ActionIcon>
     
      </Tooltip>
  )
}
export const TableActionItemEdit = ({label, path}:{label:string,path:string}) => {
  return (
    <Tooltip  withArrow label={label} >
    <Link to={path} >
      <ActionIcon variant="light" className='text-secondary-500' color="secondary.5" size={"md"} p={3}>
<PencilIcon/>
        </ActionIcon>
      </Link>
      </Tooltip>
  )
}

export const TableActionItemDetails = ({label, path}:{label:string,path:string}) => {
    return (
      <Tooltip  withArrow label={label} >
      <Link to={path} >
        <ActionIcon variant="light"  className='text-secondary-500' color="secondary.5" size={"md"} p={3}>
  <EyeIcon/>
          </ActionIcon>
        </Link>
        </Tooltip>
    )
  }