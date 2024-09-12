import { Link } from "react-router-dom";
import { CompanyDto } from "../../../../cores/models/company.dto"
import { Card, Image, Text, Badge, Group, Space, Spoiler, Avatar, BackgroundImage, Box } from '@mantine/core';


export const HomeCompanyItem = ({company}:{company:CompanyDto}) => {

  return (
    
    <Card component={Link} p={0} to={`/company/details/${company.id}`} className='ring-1 ring-gray-300 hover:shadow-lg duration-500'  radius="md" >
        <Card.Section  p={0} className="">
         <BackgroundImage className="" src={`${company.imagePath}`}>
          <Box className="flex flex-col pt-3 items-center justify-center bg-white/40  backdrop-blur-lg">
          <div className="h-[200px] content-center ">
<Image  className="max-h-full w-auto pt-4 " src={company.imagePath}/>

          </div>
<Text className="text-2xl font-bold">{company.shortname}</Text>
<Text className="text-sm font-bold">{company.name}</Text>
</Box>
         </BackgroundImage>

          
        </Card.Section>

     
     

    
<Space flex={3}/>
    
    </Card>
  
  );
}