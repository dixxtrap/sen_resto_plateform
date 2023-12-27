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
import { CompanyRestaurantBase } from './company_restaurant.entity';
import { CryptoService } from 'src/utils/crypto_service';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.entity';

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
  @Column()
  passwordCrypt: string;
  @Column({ nullable: true, default: null })
  roleId: number;
  @ManyToOne(() => Role, { nullable: true })
  role: Role;
 
  @Column(() => Coordonates) 
  coordonates: Coordonates;
  @Column(() => Address)
  address: Address;
  @ManyToOne(() => CompanyRestaurantBase)
  parent: CompanyRestaurantBase;
  @Column({ nullable: true, default: null })
  parentId: number;
  @Column(() => CreationDetails)
  details: CreationDetails;
  @Column({ default: true })
  isMfa: boolean;
  @BeforeInsert()
  async transformPassword() {
    this.passwordCrypt = CryptoService.encrypt(this.password);
    this.password = CryptoService.createHash(this.password);
  }
}

export class UserDto {
  id: number;
  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  coordonates: CoordonatesDto;
  @ApiProperty({ type: () => AddressDto })
  address: AddressDto;
  partnerId: number;

  @ApiProperty({ type: () => CreationDetailsDto })
  details: CreationDetailsDto;
}
export class CreateUserDto extends UserDto {
  @ApiProperty()
  password: string;
  passwordCrypt: string;
}
