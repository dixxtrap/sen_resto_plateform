
import { CreationDetails } from './details.entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { GiftHistory } from './gift_history.entity';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Column } from 'typeorm/decorator/columns/Column';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';
import { Partner } from './partner.entity';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';
@Entity()
export class Gift extends CreationDetails{
    @PrimaryGeneratedColumn()
    id:number
    @Column("text")
    description:string
    @ManyToOne((type) => Partner)
    partner:Partner
    @Column({nullable:true, default:null})
    partnerId:number
    @Column()
    isActive:boolean
    @Column("double")
    discount:number
    @OneToMany(()=>GiftHistory, (item)=>item.gift )
    history:GiftHistory
}

export class GiftDto{
    @ApiProperty()
    description:string;
    @ApiProperty()
    isActive:boolean;
   
    @ApiProperty()
    discount:number;
}