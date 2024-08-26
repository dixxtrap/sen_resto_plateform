import { Entity } from "typeorm/decorator/entity/Entity";
import { CreationDetails } from "./details.entity";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Column } from "typeorm/decorator/columns/Column";
@Entity()
export class GiftHistory extends CreationDetails{
    @PrimaryGeneratedColumn()
    id:number
    @Column('double')
    amount:number
    @Column('double')
    discount:number
    @Column('double')
    isActive:number
}