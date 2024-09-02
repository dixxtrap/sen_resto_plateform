import { Paper ,Title, Text, Button, Overlay, Avatar} from "@mantine/core"
import classes from '../styles/story_item.module.css'
import { Story } from "../../../../cores/models/story.dto"
import { CompanyDto } from '../../../../cores/models/company.dto';
export const  StoryItem=({story, company}:{story:Story,company:CompanyDto}) =>{
  return (
    <Paper shadow="md" p="xl" radius="md" h={'100%'} style={{backgroundImage:`url(${story.imagePath})`}} className={classes.card+ " rounded-lg overflow-hidden"}>
      <Overlay className="backdrop-blur-md rounded-lg overflow-hidden" zIndex={0}/>
  
    <div className="grow"></div>
    <center className="w-full mx-auto">
      <Avatar  radius={0} h={'auto'} w={"100%"} src={story.imagePath}/>
    </center>
    <div className="grow"></div>
    {/* <Button variant="white" color="dark">
      Read article
    </Button> */}
  </Paper>
  )
}
