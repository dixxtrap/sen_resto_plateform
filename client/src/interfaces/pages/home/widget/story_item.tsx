import { Paper , Avatar} from "@mantine/core"
import classes from '../styles/story_item.module.css'
import { Story } from "../../../../cores/models/story.dto"
import { CompanyDto } from '../../../../cores/models/company.dto';
export const  StoryItem=({story}:{story:Story,company:CompanyDto}) =>{
  return (
    <Paper  h={'100%'} style={{backgroundImage:`url(${story.imagePath})`}} className={classes.card+ " relative "}>
     
  <div className="flex justify-between items-center content-center w-full  h-full bg-black/20 ">
    
    <center className="w-full h-auto md:h-full md:w-auto  m-auto">
      <Avatar  radius={0} h={'100%'} w={"100%"} src={story.imagePath}/>
    </center>
   
    </div>
    {/* <Button variant="white" color="dark">
      Read article
    </Button> */}
  </Paper>
  )
}
