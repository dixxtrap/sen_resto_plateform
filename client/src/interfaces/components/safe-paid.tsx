import { Str } from '../../cores/constantes/str'
import { ImgAssets } from '../../cores/constantes/img'

export const SafePaid = () => {
  return (
    <div className='bg-gray-50  py-12 md:py-16 flex flex-row-reverse  items-center relative'>
    <div className='flex  flex-row-reverse  max-w-7xl mx-auto items-start'>
    <img src={ImgAssets.safePaid} className='illus  right    desc  ring-1 ring-inset ring-primary-100 '  title='deliver'/>
    <div className='w-10'></div>
    <div className='flex  flex-col '>
     <span className='title1 text-gray-800'>{Str.safePaid}</span>
     <span className='subtitle1 desc'>{Str.safePaidDesc}</span>
    </div>
    </div>
  
      <img src="src/assets/svg/Groupflower6.svg" alt="" className='w-[200px] md:w-[500px] absolute left-0 '/>
    
    </div>
  )
}
