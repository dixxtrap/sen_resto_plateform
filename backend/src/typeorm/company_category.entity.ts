import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import { CompanyRestaurantBase } from "./company_restaurant.entity";
import { ManyToOne } from "typeorm/decorator/relations/ManyToOne";
import { Column } from "typeorm/decorator/columns/Column";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { CreationDetails } from "./details.entity";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import { Product } from "./product.entity";



@Entity({orderBy:{priority:"DESC"}})

export class CompanyCategory {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => CompanyRestaurantBase)
    partner: CompanyRestaurantBase
    @Column()
    name: string;

    @Column("text", { nullable: true, default: true })
    description: string;
    @Column()
    partnerId: number;
    @Column({ default: 1,nullable:true })
    priority: number;
    @OneToMany(()=>Product, (alias)=>alias.companyCategory)
    product:Product[]
    @Column({ default: true })
    isActive: boolean;
    @Column(() => CreationDetails)
    details: CreationDetails
}

export class CompanyCategoryDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    priority: number;
    @ApiProperty()
    isActive: boolean;
}