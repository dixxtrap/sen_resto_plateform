import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { BeforeInsert } from 'typeorm/decorator/listeners/BeforeInsert';
import { BeforeUpdate } from 'typeorm/decorator/listeners/BeforeUpdate';
import { CompanyRestaurantBase } from './company_restaurant.entity';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';

@Entity()
export class EstablishmentType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: false })
  name: string;
  @Column({ type: 'text', unique: false, nullable: false })
  description: string;
  @Column({ nullable: true, default: null })
  imagePath: string;
  @Column({ nullable: false, default: true })
  isActive: boolean;
@OneToMany(()=>CompanyRestaurantBase, (alias)=>alias.establishmentType )
company:CompanyRestaurantBase[]
  @BeforeInsert()
  @BeforeUpdate()
  changeBoolean() {
    console.log(typeof(this.isActive))
    this.isActive=`${this.isActive}`=='true'}
    
}

export class EstablishmentTypeDto {
  @ApiProperty({})
  name: string;
  @ApiProperty({})
  description?: string;
  @ApiProperty()
  imagePath?: string;
  @ApiProperty()
  isActive?: boolean; 
}
