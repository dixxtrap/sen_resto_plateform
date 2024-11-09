import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreationDetails, CreationDetailsDto } from './details.entity';
import { ProductFile } from './product_file.entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { ProductRaiting } from './product_rating.entity';
import { CompanyCategory } from './company_category.entity';
import { Company } from './partner/company.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column('text')
  description: string;
  @ManyToOne(() => CompanyCategory)
  companyCategory: CompanyCategory;
  @Column({ nullable: true, default: null })
  companyCategoryId: number;
  @Column('double')
  price: number;
  @Column('double')
  reduction: number;
  @Column()
  cookingTime: string;
  @Column({ nullable: true, default: true })
  isActive: boolean;
  @OneToMany(() => ProductFile, (item) => item.product)
  file: ProductFile;
  @ManyToOne(() => Company)
  company: Company;
  @Column()
  companyId: number;
  @Column(() => CreationDetails)
  details: CreationDetails;
  @OneToMany(() => ProductRaiting, (item) => item.product)
  rating: ProductRaiting[];
}

export class ProductDto {
  id?: number;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  reduction: number;
  @ApiProperty()
  companyCategoryId: number;
  @ApiProperty()
  cookingTime: string;
  @ApiProperty()
  isActive: boolean;
  categoryIds: number[];
  companyId: number;
  @ApiProperty({ type: () => CreationDetailsDto })
  details: CreationDetailsDto;
}
