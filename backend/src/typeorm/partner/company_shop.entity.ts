import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
import { Company } from './company.entity';
import { CreationDetails } from '../details.entity';
import { Coordonates, CoordonatesDto } from '../coordonates.entity';
import { CompanyCategoryDto } from '../company_category.entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Index } from 'typeorm/decorator/Index';
import { AfterLoad } from 'typeorm/decorator/listeners/AfterLoad';
import { BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
@Index(['companyId', 'name'])
export class CompanyShop {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, default: true })
  backgroundPath: string;
  @ManyToOne(() => Company, (alias)=> alias.shop)
  company: Company;
  @Column({ nullable: true, default: null })
  companyId: number;
  @Column({})
  name: string;
  @Column("text",{nullable: true, default: null})
  description: string;
  @Column({ nullable: true, default: null })
  address: string;
  @Column({ unique:false , nullable: true, default: null})
  phone: string;
  @Column({type:"boolean", unique:false , nullable: true, default: true})
  isActive: boolean;
  @Column('time', { default: '23:00:00' })
  closingTime: string;
  @Column('time', { default: '08:00:00' })
  openingTime;
  isOpen: boolean;

  @Column(() => CreationDetails) details: CreationDetails;
  @Column(() => Coordonates) location: Coordonates;
  @BeforeInsert()
  @BeforeUpdate()
  isActiveHandler(){
console.log(`${this.isActive}`==='true')
  this.isActive= `${this.isActive}`==='true';

  }
  @AfterLoad()
  setOpen() {
    const now = new Date();

    const time = `${now.toTimeString()}`;

    this.isOpen = this.closingTime > time && this.openingTime < time;
  }
}

export class CompanyShopDto {
  @ApiProperty() name: string;
  @ApiProperty() backgroundPath: string;
  @ApiProperty() address: string;
  @ApiProperty() description: string;
  @ApiProperty() phone: string;
  @ApiProperty() isActive: boolean;
  @ApiProperty()
  closingTime: string;
  @ApiProperty()
  openingTime;
  isOpen: boolean;
  @ApiProperty({ type: () => CompanyCategoryDto }) location: CoordonatesDto;
}
