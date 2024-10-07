
import { ChildEntity } from 'typeorm/decorator/entity/ChildEntity';
import { Partner, PartnerDto } from './partner.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm/decorator/columns/Column';
import { EstablishmentType } from './establishment_type';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';
import { CompanyCategory } from './company_category.entity';
import { AfterLoad } from 'typeorm';
@ChildEntity()
export class CompanyRestaurantBase extends Partner {
  @Column()
  shortname: string;
  @Column('text')
  description: string;
  @OneToMany(()=>CompanyCategory, (alias)=>alias.partner)
category:CompanyCategory[]
  @Column()
  name: string;
  @Column('time', { default: '23:00:00' })
  closingTime: string;
  @Column('time', { default: '08:00:00' })
  openingTime: string;
  @ManyToOne(()=>EstablishmentType,(alias)=>alias.company)
  establishmentType:EstablishmentType
  @Column()
  establishmentTypeId:number
  isOpen:boolean
  @AfterLoad()
  setOpen(){
    const now=new Date();
    
    const time=`${now.toTimeString()}`

this.isOpen= this.closingTime>time&&this.openingTime<time;
  }
}

@ChildEntity()
export class Restaurant extends CompanyRestaurantBase {}

@ChildEntity()
export class Coorporate extends CompanyRestaurantBase {}
@ChildEntity()
export class CompanyRestaurant extends CompanyRestaurantBase {}

export class CompanyRestaurantBaseDto extends PartnerDto {
  @ApiProperty()
  shortname: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  name: string;
}
