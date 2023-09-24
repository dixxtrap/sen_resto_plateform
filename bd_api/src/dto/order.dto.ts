import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from 'src/typeorm/order';

export class OrderDto {
  id: number;
  @ApiProperty()
  customerId: number;
  @ApiProperty()
  restaurantId: number; 
  @ApiProperty()
  deliveryDate: Date;
  @ApiProperty()
  status: OrderStatus;
  @ApiProperty()
  description: string;
  @ApiProperty()
  message: string;
}
