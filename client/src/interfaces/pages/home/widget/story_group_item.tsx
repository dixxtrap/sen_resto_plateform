import { Avatar, Text,Image, UnstyledButton } from '@mantine/core'
import { StoryGroup } from '../../../../cores/models/story.dto'

export const StoryGroupItem = ({storyGroup}:{storyGroup:StoryGroup}) => {
  return (
    <UnstyledButton component='div' style={{backgroundImage:`url(${storyGroup?.story![0].imagePath})`,backgroundSize:"200%", backgroundPosition:"center"}}  className=' ring-1  relative border-green-300 h-full border-2 box-content rounded-md     '>

       <div className='h-full   rounded-md  content-center flex backdrop-blur-sm bg-black/10 '>
        <div className='p-2 flex items- justify-center'>
        <Avatar radius={3} className=' z-30  w-auto' src={storyGroup.partner?.imagePath}/>
        <div className='flex  flex-col pl-2'>
        <Text className="leadind-3 font-bold">{storyGroup.partner?.shortname}</Text>
        <Text className='text-sm text-slate-700 line-clamp-3 leading-3'>{storyGroup.partner?.name}</Text>
        </div>
        
        </div>
      <div className='grow'></div>
        <div className='absolute z-20  flex justify-center items-center h-full w-full '>
     <div className='mx-auto w-full  items-center justify-center '>
        <Image  className="m-auto  w-full h-48" src={`${storyGroup?.story![0].imagePath}`}/>
        </div>
    
        </div>
        </div>
    </UnstyledButton>
  )
}
