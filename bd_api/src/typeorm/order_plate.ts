import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('order_plates_plate_history')
export class OrderPlate {
  @PrimaryColumn()
  orderId: number;
  @PrimaryColumn()
  plateHistoryId: number;
  @Column({ default: 0 })
  quantity: number;
}
