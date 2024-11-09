import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { CompanyShop } from './partner/company_shop.entity'
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { CreationDetails } from './details.entity';

@Entity()
export class Seating {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @ManyToOne(() => CompanyShop)
  shop: CompanyShop;
  @Column({ nullable: true, default: null })
  partnerId: number;
  @Column({ nullable: true, default: null })
  isActive: boolean;
  @Column(() => CreationDetails) details: CreationDetails;
}
export class SeatingDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  partnerId: number;
  @ApiProperty()
  isACtive: boolean;
}
