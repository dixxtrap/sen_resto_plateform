import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coordonates, CoordonatesDto } from './coordonates.entity';
import { Address, AddressDto } from './address.entity';
import { CreationDetails, CreationDetailsDto } from './details.entity';
import { CryptoService } from 'src/utils/crypto_service';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.entity';
import { City } from './city.entity';
import { Company } from './partner/company.entity';
import { CompanyShop } from './partner/company_shop.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ default: '2213000000', unique: true })
  phone: string;
  @Column()
  passwordCrypt: string;
  @Column({ nullable: true, default: null })
  roleId: number;
  @ManyToOne(() => Role, { nullable: true })
  role: Role;
  @Column('datetime', { nullable: true, default: null })
  birthday: Date;
  @Column(() => Coordonates)
  location: Coordonates;
  @Column({ nullable: true, default: null })
  address: string;
  @ManyToOne(() => Company)
  company: Company;
  @ManyToOne(() => CompanyShop)
  shop: CompanyShop;
  @Column({ default: true })
  isActive: boolean;
  @Column({ default: true })
  isBloqued: boolean;
  @Column({ nullable: true, default: null })
  companyId: number;
  @Column({ nullable: true, default: null })
  shopId: number;
  @Column(() => CreationDetails)
  details: CreationDetails;
  @Column({ default: true })
  isMfa: boolean;
  @BeforeInsert()
  async transformPassword() {
    this.passwordCrypt = await CryptoService.encrypt(this.password);
    this.password = await CryptoService.createHash(this.password);
  }
}

export class UserDto {
  id: number;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  birthday: Date;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  location: CoordonatesDto;
  companyId?: number;
  shopId?: number;

  roleId?: number;

  @ApiProperty({ type: () => CreationDetailsDto })
  details: CreationDetailsDto;
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}

export class CreateUserDto extends UserDto {
  @ApiProperty()
  password: string;
  passwordCrypt: string;
}
