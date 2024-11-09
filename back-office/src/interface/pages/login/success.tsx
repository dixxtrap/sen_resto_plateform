import { IconCheckbox } from "@tabler/icons-react"


export const SuccessRequete = () => {
  return (
    <div className='flex flex-col items-center  justify-center h-screen'>
        <IconCheckbox className='h-24 text-secondary-400'/>
        <span className='font-bold text-xl'>Titre</span>
        <span>Message de no succes</span>
    </div>
  )
}
