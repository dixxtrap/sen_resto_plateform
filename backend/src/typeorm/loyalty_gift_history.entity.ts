import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LoyaltyGift } from './loyalty_gift.entity';
import { CreationDetails } from './details.entity';
@Entity({ orderBy: { id: 'DESC' } })
export class LoyaltyGiftHistory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('decimal', { precision: 5, scale: 3 })
  percentage: number;
  @ManyToOne(() => LoyaltyGift)
  loyaltyGift: LoyaltyGift;
  @Column({ nullable: true, default: null })
  loyaltyGiftId: number;
  @Column()
  numberOfPoints: number;

  @Column(() => CreationDetails)
  details: CreationDetails;
}
