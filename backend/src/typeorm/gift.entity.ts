import { Entity,PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { CreationDetails } from './details.entity';

@Entity()
export class Gift extends CreationDetails{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    description:number
    @Column()
    isActive:number
    @Column("double")
    amount:number
    @Column("double")
    discount:number
}