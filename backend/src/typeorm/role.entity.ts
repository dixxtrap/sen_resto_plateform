import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { CreationDetails } from './details.entity';
import { RolePermission } from './role_permissison.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Tree('nested-set')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: true, default: null })
  code: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ nullable: true, default: true })
  isActive: boolean;
  @TreeParent()
  parent: Role;
  @TreeChildren()
  children: Role[];
  @Column(() => CreationDetails)
  details: CreationDetails;
  @OneToMany(() => RolePermission, (item) => item.role)
  rolePermission: RolePermission[];
  @Column({ nullable: true, default: null })
  parentId: number;
}

export class RoleDto {
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  parentId: number;
  @ApiProperty()
  Parent: { id: number };
}
