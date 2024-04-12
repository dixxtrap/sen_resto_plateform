import { ImgAssets } from '../../cores/constantes/img'
import { Str } from '../../cores/constantes/str'

export const AfterHeader = () => {
  return (
    <div className=' h-[25vw] relative '>
<div style={{background:`url(${ImgAssets.headerBg})`, backgroundSize:'100%' }}  className='fixed top-0    h-full w-full -z-10' ></div>
<div className='bg-slate-900/30 backdrop-blur-md w-full h-full flex items-center z-10  '>
  <span className='m-auto text-8xl text-primary-500 font-serif font-bold '>{Str.appName}</span>
</div>
    </div>
  )
}
