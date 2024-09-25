import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import { CreationDetailsWithoutBy } from "./details.entity";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

@Entity()
export class Icon extends CreationDetailsWithoutBy{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    imagePath:string
    @Column()
    name:string
    @Column()
    description:string
}

export class IconDto{
    @ApiProperty()
name:string;
@ApiProperty()
description:string;
@ApiProperty()
imagePath?:string;
}