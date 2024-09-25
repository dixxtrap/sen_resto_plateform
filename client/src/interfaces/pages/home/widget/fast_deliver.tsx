import { Group5Svg } from "../../../../cores/constantes/illus"
import { deliverImg } from "../../../../cores/constantes/img"
import { Str } from "../../../../cores/constantes/str"


export const FastDeliver = () => {
  return (
    <div className='bg-gray-50  py-12 md:py-16 flex flex-wrap    items-center relative'>
    <div className='flex  flex-col md:flex-row  max-w-7xl mx-auto items-start'>
    <img src={deliverImg} className='illus  left    desc  ring-1 ring-inset ring-primary-100  hidden md:block'  title='deliver'/>
    <div className='w-10'></div>
    <div className='flex  flex-col'>
     <span className='title1 text-gray-800'>{Str.deliver}</span>
     <div className="p-2 md:p-0">
     <img className="float-right w-[180px] h-auto mx-3 rounded-md md:hidden" src={deliverImg}/>
     <span className='subtitle1 desc '>{Str.deliverDesc}</span>
     </div>
    
    </div>
    </div>
  
      <img src={Group5Svg} alt="" className='w-[500px] md:w-[500px] absolute right-0 '/>
    
    </div>
  )
}
