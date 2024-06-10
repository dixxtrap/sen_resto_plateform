import { Group6Svg } from "../../../../cores/constantes/illus"
import { safePaidImg } from "../../../../cores/constantes/img"
import { Str } from "../../../../cores/constantes/str"


export const SafePaid = () => {
  return (
    <div className='bg-gray-50  py-12 md:py-16 flex flex-row-reverse  items-center relative'>
    <div className='flex  flex-col  md:flex-row-reverse  max-w-7xl mx-auto items-start'>
    <img src={safePaidImg} className='illus  right    desc  ring-1 ring-inset ring-primary-100 '  title='deliver'/>
    <div className='w-0åß  md:w-10'></div>
    <div className='flex  flex-col px-2 '>
     <span className='title1 text-gray-800'>{Str.safePaid}</span>
     <span className='subtitle1 desc'>{Str.safePaidDesc}</span>
    </div>
    </div>
  
      <img src={Group6Svg} alt="" className='w-[600px] md:w-[500px] absolute left-0 '/>
    
    </div>
  )
}
