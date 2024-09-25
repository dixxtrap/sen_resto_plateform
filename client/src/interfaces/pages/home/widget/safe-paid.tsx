import { Group6Svg } from "../../../../cores/constantes/illus"
import { safePaidImg } from "../../../../cores/constantes/img"
import { Str } from "../../../../cores/constantes/str"
import { GlobMask } from "../../../components/masked-img/glob_mask"


export const SafePaid = () => {
  return (
    <div className='bg-gray-50  py-12 md:py-16 flex flex-row-reverse  items-center relative'>
    <div className='flex  flex-col  md:flex-row-reverse  max-w-7xl mx-auto items-start'>
    <div className="  right mx-auto min-w-[340px]  h-80 w-auto hidden md:block desc  ">
   
    <img src={safePaidImg} className='illus  right     desc  ring-1 ring-inset ring-primary-100 '  title='deliver'/>
    </div>
    {/* <img src={safePaidImg} className='illus  right    desc  ring-1 ring-inset ring-primary-100 '  title='deliver'/> */}
    <div className='w-0  md:w-10'></div>
    <div className='flex  flex-col px-2 '>
     <span className='title1 text-gray-800'>{Str.safePaid}</span>
     <div>
     <img className="float-left w-[180px] h-auto mr-3 rounded-md md:hidden" src={safePaidImg}/>
     <span className='subtitle1 desc text-xs leading-3'>
      {Str.safePaidDesc}</span>
     </div>
     
    </div>
    </div>
  
      <img src={Group6Svg} alt="" className='w-[600px] md:w-[500px] absolute left-0 '/>
    
    </div>
  )
}
