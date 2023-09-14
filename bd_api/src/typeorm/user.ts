import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  AfterLoad,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CryptoService } from 'src/utils/crypto_service';
import { Company, Permission, Restaurant, Role } from '.';
import { FileDocument } from './';
@Entity('user')
@Index(['email', 'phone'], { unique: true })
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
  @Column({ type: 'varchar', length: 20 })
  firstname: string;
  @Column('varchar')
  lastname: string;
  @Column('')
  email: string;
  @Column('varchar')
  pin: string;
  @Column('varchar')
  encryptedPin: string;
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
  @Column({ type: 'boolean', default: false })
  isAgent: boolean;
  @ManyToOne(() => Restaurant)
  @JoinColumn()
  restaurant: Restaurant;
  @Column({ nullable: true, default: null })
  restaurantId: number;
  @ManyToOne(() => Company)
  @JoinColumn()
  company: Company;
  @Column({ nullable: true, default: null })
  companyId: number;
  @ManyToMany(() => Permission, {
    cascade: true,
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    eager: true,
  })
  @JoinTable()
  permission: Permission[];

  @Column({ type: 'varchar', length: 40 })
  address: string;
  @Column({ type: 'varchar', length: 20 })
  country: string;
  @Column({ type: 'varchar', length: 20 })
  city: string;
  @Column({ type: 'datetime', nullable: true })
  birthday: Date;
  @Column({ type: 'varchar', length: 30 })
  phone: string;
  @Column('bigint')
  roleId: number;
  @ManyToOne(() => Role, (role) => role.user)
  role: Role;
  @OneToOne(() => FileDocument, {
    cascade: true,
    nullable: true,
    onUpdate: 'NO ACTION',
  })
  @JoinColumn()
  profile: FileDocument;

  @Column('boolean', { default: true })
  status: boolean;
  @UpdateDateColumn()
  updatedAt: Date;
  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.restaurantId = this.restaurantId == 0 ? null : this.restaurantId;
    this.companyId = this.companyId == 0 ? null : this.companyId;
    this.pin = await CryptoService.createHash(this.pin);
    this.encryptedPin = await CryptoService.encrypt(this.pin);
  }

  permissionLenght: number;
  @AfterLoad()
  private async PermissionLenght() {
    this.permissionLenght = this.permission.length;
  }
}
