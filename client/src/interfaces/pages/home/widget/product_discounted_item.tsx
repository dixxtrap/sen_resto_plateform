import { ProductDto } from '../../../../cores/models/product'
import { Card, Image, Group, Text , Badge, Space } from '@mantine/core'

export const ProductDiscountedItem = ({product}:{product:ProductDto}) => {
  return (
    <Card   padding="lg" radius="md" className='ring-1 ring-gray-300 hover:shadow-lg duration-500'>
      <Card.Section component="div" style={{backgroundImage:`url(${product.file![0].path})`}} className="flex h-[200px] " >
        <div className='flex bg-black/5 backdrop-blur-lg w-full '>
        <Image
          src={product.file![0].path}
          className="h-full  w-auto m-auto "
          alt="Norway"
        />
        </div>
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text className="text-2xl" fw={600}>{product.name}</Text>
        <Badge color="">
            <Text className='font-bold' >-{product.reduction} %</Text>
        </Badge>
      </Group>
     
     
<Space flex={3}/>
     <Group justify="space-between">
<Text className='line-through text-gray-600'>{product.price} {import.meta.env.VITE_REACT_CURRENCY}</Text>
<Text className='font-bold '>{product.price! * (1-product.reduction!/100)} {import.meta.env.VITE_REACT_CURRENCY}</Text>
     </Group>
    </Card>
  )
}
