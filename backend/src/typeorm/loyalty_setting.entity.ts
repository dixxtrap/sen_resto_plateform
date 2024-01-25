import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Partner } from './partner.entity';
import { CreationDetails } from './details.entity';

@Entity()
export class LoyaltySetting {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: true })
  status: boolean;
  @Column()
  label: string;
  @Column()
  amount: number;
  @Column({ default: true })
  isActive: boolean;
  @Column('text')
  description: string;
  @ManyToOne(() => Partner)
  parent: Partner;
  @Column()
  parentId: number;
  @Column(() => CreationDetails)
  details: CreationDetails;
}
