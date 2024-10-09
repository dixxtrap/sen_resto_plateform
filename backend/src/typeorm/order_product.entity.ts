import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductHistory } from './product_history.entity';
import { Order } from './order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class OrderProduct {
  @PrimaryColumn()
  productHistoryId: number;
  @PrimaryColumn()
  orderId: number;
  @ManyToOne(() => ProductHistory)
  productHistory: ProductHistory;
  @ManyToOne(() => Order)
  order: Order;
  @Column()
  quantity: number;
}

export class OrderProductDto {
  @ApiProperty()
  productHistoryId: number;
  @ApiProperty()
  orderId: number;
 
  @ApiProperty()
  quantity: number;
}
