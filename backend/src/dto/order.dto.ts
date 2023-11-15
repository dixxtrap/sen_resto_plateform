import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from 'src/typeorm/order';
import { Column } from 'typeorm';

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

export class OrderPlateDetails {}
export class OrderAddPlate {
  @ApiProperty()
  plateId: number;
  @Column('text')
  comment: string;
  @ApiProperty()
  customerId: number;
  @ApiProperty()
  quantity: number;
}
