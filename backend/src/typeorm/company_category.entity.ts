import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import { CompanyRestaurantBase } from "./company_restaurant.entity";
import { ManyToOne } from "typeorm/decorator/relations/ManyToOne";
import { Column } from "typeorm/decorator/columns/Column";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { CreationDetails } from "./details.entity";



@Entity()
export class CompanyCategory{
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(()=>CompanyRestaurantBase)
    partner:CompanyRestaurantBase
    @Column()
    name:string;
    @Column()
    partnerId:number;
    @Column()
    isActive:boolean;
    @Column(()=>CreationDetails)
    details:CreationDetails
}

export class CompanyCategoryDto{
@ApiProperty()
name:string;
@ApiProperty()
isActive:boolean;
}