import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import { ManyToOne } from "typeorm/decorator/relations/ManyToOne";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import { CreationDetailsWithoutBy } from "./details.entity";
import { Coordonates } from "./coordonates.entity";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";



export enum CityEnum{
    REGION='REGION',
    DEPARTEMENT='DEPARTEMENT',
    ARRONDISSEMENT='ARRONDISSEMENT',
     COMMUNE='COMMUNE' ,
}
@Entity()
export class City extends Coordonates{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column({type:'enum', enum:CityEnum})
    type:CityEnum;
    @OneToMany(()=>City,(table)=>table.parent)
    children:City[]
    @ManyToOne(()=>City)
    parent:City
    @Column({nullable:true, default:null})
    parentId:number
    @Column(type => CreationDetailsWithoutBy, { prefix: false })
    details: CreationDetailsWithoutBy; 
   
}

export class CityDto{
    @ApiProperty()
    name:string;
    @ApiProperty()
    latitude:number;
    @ApiProperty()
    longitude:number;
    constructor(partial: Partial<CityDto>) {
        Object.assign(this, partial);
      }
}