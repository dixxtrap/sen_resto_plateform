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
  JoinColumn,
} from 'typeorm';
import { Permission, User } from '.';
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
  @JoinColumn()
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
  userLenght: number;
  @AfterLoad()
  private async PermissionLenght() {
    console.log(this);
    this.permissionLenght = this.permission.length;
    this.userLenght = this.user?.length ?? 0;
  }
}
