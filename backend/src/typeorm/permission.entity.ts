import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreationDetails } from './details.entity';
import { RolePermission } from './role_permissison.entity';
import { ModuleEntity } from './module.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UppercaseTransformer } from 'src/transformer/uppercase.transformer';

export enum PermissionActionEnum {
  update = 'update',
  create = 'create',
  details = 'details',
  read = 'read',
  delete = 'delete',
  all = '*',
}

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: false, default: true })
  isActive: boolean;
  @Column()
  name: string;
  @Column({
    nullable: true,
    default: null,
    unique: true,
    transformer: [new UppercaseTransformer()],
  })
  code: string;
  @Column({ nullable: true, default: null })
  description: string;
  @ManyToOne(() => ModuleEntity)
  module: ModuleEntity;
  @Column({ nullable: true, default: null })
  moduleId: number;
  @Column('enum', { enum: PermissionActionEnum })
  action: PermissionActionEnum;
  @Column(() => CreationDetails)
  details: CreationDetails;
  @OneToMany(() => RolePermission, (item) => item.permission)
  roles: RolePermission[];
}

export class PermissionDto {
  id: number;
  @ApiProperty({})
  code: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ nullable: true, default: null })
  moduleId: number;
  @ApiProperty({ enum: PermissionActionEnum })
  action: PermissionActionEnum;
}
