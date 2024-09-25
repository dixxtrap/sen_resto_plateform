import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { CreationDetailsWithoutBy } from "./details.entity";
import { Entity } from "typeorm/decorator/entity/Entity";
@Entity()
export class Message extends CreationDetailsWithoutBy{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    to:string;
    @Column()
    content:string;
}