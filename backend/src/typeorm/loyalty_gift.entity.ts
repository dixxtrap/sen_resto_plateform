// import {
//   Column,
//   Entity,
//   ManyToOne,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { Partner } from './partner.entity';
// import { Product } from './product.entity';
// import { LoyaltyGiftHistory } from './loyalty_gift_history.entity';
// import { CreationDetails } from './details.entity';

// @Entity({ orderBy: { id: 'DESC' } })
// export class LoyaltyGift {
//   @PrimaryGeneratedColumn()
//   id: number;
//   @ManyToOne(() => Partner)
//   parent: Partner;
//   @Column({ nullable: true, default: null })
//   ParentId: number;
//   @Column({ unique: true })
//   name: string;
//   @Column('text')
//   description: string;
//   @Column('decimal', { precision: 5, scale: 3 })
//   percentage: number;
//   @Column()
//   numberOfPoints: number;
//   @Column({ default: true })
//   isActive: boolean;
//   @ManyToOne(() => Product)
//   product: Product;
//   @Column({ nullable: true, default: null })
//   productId: number;
//   @OneToMany(() => LoyaltyGiftHistory, (item) => item.loyaltyGift)
//   history: LoyaltyGiftHistory[];
//   @Column(() => CreationDetails)
//   details: CreationDetails;
// }
