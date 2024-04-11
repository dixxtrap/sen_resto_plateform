import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyRestaurantBase } from './company_restaurant.entity';
import { CreationDetails, CreationDetailsDto } from './details.entity';
import { ProductFile } from './product_file.entity';
import { Category, CategoryDto } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProductRaiting } from './product_rating.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column('text')
  description: string;
  @Column('double')
  price: number;
  @Column('double')
  reduction: number;
  @Column('double')
  cookingTime: number;
  @OneToMany(() => ProductFile, (item) => item.product)
  file: ProductFile;
  @ManyToMany(() => Category, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  category: Category[];
  @ManyToOne(() => CompanyRestaurantBase)
  parent: CompanyRestaurantBase;

  @Column()
  parentId: number;
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
  cookingTime: number;
  @ApiProperty({ type: () => CategoryDto })
  category: CategoryDto[];
  parentId: number;
  @ApiProperty({ type: () => CreationDetailsDto })
  details: CreationDetailsDto;
}
