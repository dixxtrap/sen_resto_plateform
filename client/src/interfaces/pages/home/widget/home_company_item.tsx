import { Link } from "react-router-dom";
import { CompanyDto } from "../../../../cores/models/company.dto"
import { Card, Image, Text, Badge, Button, Group, Space, Spoiler, UnstyledButton } from '@mantine/core';


export const HomeCompanyItem = ({company}:{company:CompanyDto}) => {

  return (
    
    <Card component={Link} to="." className='ring-1 ring-gray-300 hover:shadow-lg duration-500'  padding="lg" radius="md" >
      <Card.Section component="div" className="flex h-[200px]" >
        <Image
          src={company.imagePath}
          className="h-[200px] rounded-md w-auto mx-auto pt-10"
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text className="text-2xl" fw={600}>{company.name}</Text>
        <Badge >{company.openingTime?.slice(0,5)}/{company.closingTime?.slice(0,5)}</Badge>
      </Group>
      <Spoiler maxHeight={38} showLabel="Voir plus" hideLabel="Voir moins">
      <Text size="sm" c="dimmed">
       {company.description}
      </Text>
    </Spoiler>
     
<Space flex={3}/>
    
    </Card>
  
  );
}