import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import { ManyToOne } from "typeorm/decorator/relations/ManyToOne";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import { CreationDetailsWithoutBy } from "./details.entity";



export enum CityEnum{
    REGION='REGION',
    DEPARTEMENT='DEPARTEMENT',
    ARRONDISSEMENT='ARRONDISSEMENT',
     COMMUNE='COMMUNE' ,
}
@Entity()
export class City{
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