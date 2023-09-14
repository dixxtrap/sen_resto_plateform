import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  JoinTable,
  ManyToMany,
  AfterLoad,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission, User } from './';
import { UppercaseTransformer } from 'src/transformer/uppercase.transformer';

@Entity('role')
@Index(['scope', 'name'], { unique: true })
export class Role {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;
  @Column('enum', {
    transformer: new UppercaseTransformer(),
    enum: ['SUPER', 'RESTAURANT', 'COMPANY', 'DELIVER', 'CUSTOMER'],
  })
  scope: string;
  @Column('boolean', { default: true })
  isActive: boolean;
  @Column('varchar', { length: 30 })
  name: string;
  @OneToMany(() => User, (u) => u.role)
  user: User[];
  @ManyToMany(() => Permission, {
    cascade: true,
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    eager: true,
  })
  @JoinTable()
  permission: Permission[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  permissionLenght: number;
  @AfterLoad()
  private async PermissionLenght() {
    this.permissionLenght = this.permission.length;
  }
}
