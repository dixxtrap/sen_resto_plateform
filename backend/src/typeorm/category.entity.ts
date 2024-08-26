import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('nested-set')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @TreeParent()
  parent: Category;
  @Column({ nullable: true, default: null })
  parentId: number;
  @TreeChildren()
  children: Category[];
}

export class CategoryDto {
  id?: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  parentId?: number;
  children?: CategoryDto[];
}
