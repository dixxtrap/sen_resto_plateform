import { PrimaryColumn, Entity, ManyToOne } from 'typeorm';
import { Card } from './card.entity';
import { CardAllocation } from './card_allocation.entity';
@Entity()
export class CardAllocationDetails {
  @PrimaryColumn()
  cardAllocationId: number;
  @PrimaryColumn()
  cardId: number;
  @ManyToOne(() => Card)
  card: Card;
  @ManyToOne(() => CardAllocation)
  cardAllocation: CardAllocation;
}
