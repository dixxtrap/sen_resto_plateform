import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity('module')
@Tree('nested-set')
export class ModuleEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: true, default: null })
  name: string;
  @TreeParent()
  parent: ModuleEntity;
  @TreeChildren()
  children: ModuleEntity[];
  @Column({ nullable: true, default: null })
  parentId: number;
  @BeforeInsert()
  transformParentId() {
    if (this.parentId && !this.parent)
      this.parent = { id: this.parentId } as ModuleEntity;
  }
}

export class ModuleEntityDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  parent: ModuleEntityDto;
}
