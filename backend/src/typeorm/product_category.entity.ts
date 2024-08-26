import { Entity, PrimaryColumn } from 'typeorm';

@Entity("product_category_category")
export class ProductCategory {
  @PrimaryColumn()
  productId: number;
  @PrimaryColumn()
  categoryId: number;
}
