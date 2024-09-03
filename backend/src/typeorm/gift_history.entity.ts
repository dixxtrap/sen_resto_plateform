import { Entity } from "typeorm/decorator/entity/Entity";
import { CreationDetails } from "./details.entity";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Column } from "typeorm/decorator/columns/Column";
import { ManyToOne } from "typeorm";
import { Gift } from "./gift.entity";
import { Partner } from "./partner.entity";
@Entity()
export class GiftHistory extends CreationDetails{
    @PrimaryGeneratedColumn()
    id:number;
    @Column('double')
    discount:number;
    @Column('bool')
    isActive:boolean;
    @ManyToOne(()=>Gift)
    gift: Gift;
    @Column("text")
    description:string
}