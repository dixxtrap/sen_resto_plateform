import { Column } from 'typeorm/decorator/columns/Column';
import { CompanyCategory } from '../company_category.entity';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { AfterLoad } from 'typeorm/decorator/listeners/AfterLoad';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
import { EstablishmentType } from '../establishment_type';
import { Coordonates } from '../coordonates.entity';
import { CompanyShop } from './company_shop.entity';
import { CreationDetails } from '../details.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Partner } from '../partner.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  description: string;
  @Column({ nullable: true, default: null })
  imagePath: string;
  @Column({ nullable: true, default: null })
  address: string;
  @Column({ nullable: true, default: null })
  backgroundPath: string;
  @Column({ nullable: true, default: null })
  email: string;
  @ManyToOne(() => Partner)
  partner: Partner;
  @Column({ nullable: true, default: null })
  partnerId: number;
  @OneToMany(() => CompanyCategory, (alias) => alias.partner)
  category: CompanyCategory[];
  @OneToMany(() => CompanyShop, (alias) => alias.company)
  shop: CompanyShop[];
  @Column()
  name: string;
  @Column({ unique: true })
  shortname: string;
  @Column({ unique: true })
  phone: string;
  @Column('time', { default: '23:00:00' })
  closingTime: string;
  @Column('time', { default: '08:00:00' })
  openingTime: string;
  isOpen: boolean;
  @Column({ default: true })
  isActive: boolean;
  @Column(() => Coordonates)
  location: Coordonates;
  @Column(() => CreationDetails)
  details: CreationDetails;
  @ManyToOne(() => EstablishmentType)
  establishmentType: EstablishmentType;
  @Column({ nullable: true, default: null })
  establishmentTypeId: number;
  @Column({ default: false })
  isShop: boolean;
  @AfterLoad()
  setOpen() {
    const now = new Date();

    const time = `${now.toTimeString()}`;
    if (this.closingTime > this.openingTime)
      this.isOpen = this.closingTime > time && this.openingTime < time;
    else if (this.closingTime < this.openingTime)this.isOpen = !(this.closingTime > time && this.openingTime < time);
    else this.isOpen = true;
  }
}

export class CompanyDto {
  @ApiProperty()
  description: string;
  @ApiProperty()
  imagePath: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  backgroundPath: string;
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
  @ApiProperty()
  shortname: string;
  @ApiProperty()
  phone: string;
  @ApiProperty({ default: '23:00:00' })
  closingTime: string;
  @ApiProperty({ default: '23:00:00' })
  openingTime: string;
  @ApiProperty({ default: false })
  isShop: boolean;
}
