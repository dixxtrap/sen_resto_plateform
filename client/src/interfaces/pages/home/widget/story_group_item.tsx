import { Avatar, UnstyledButton } from '@mantine/core'
import { StoryGroup } from '../../../../cores/models/story.dto'

export const StoryGroupItem = ({storyGroup}:{storyGroup:StoryGroup}) => {
  return (
    <UnstyledButton component='div' style={{backgroundImage:`url(${storyGroup.partner?.imagePath})`,backgroundSize:"200%", backgroundPosition:"center"}}  className=' ring   border-green-300  border-2 box-content rounded-md  w-20  flex items-center    h-20'>
        
       <div className='h-full rounded-md  flex backdrop-blur-sm p-2'>
        <Avatar radius={3} className='h-auto    my-auto w-auto' src={storyGroup.partner?.imagePath}/>
        </div>
    </UnstyledButton>
  )
}
