import {
  CompanyRestaurantBase,
  CompanyRestaurant,
  Restaurant,
} from './company_restaurant.entity';
import { ModuleEntity } from './module.entity';
import { Partner } from './partner.entity';
import { PaymentType } from './payment_type.entity';
import { Permission } from './permission.entity';
import { Role } from './role.entity';
import { RolePermission } from './role_permissison.entity';
import { User } from './user.entity';
import { Weekday } from './weekday.entity';
import { Category } from './category.entity';
import { Customer } from './customer.entity';
import { Contrat } from './contrat.entity';
import {
  ProductManagement,
  ProductManagementDay,
} from './product_management.entity';
import { ProductFile } from './product_file.entity';
import { Product } from './product.entity';

// export
export {
  Partner,
  CompanyRestaurant,
  CompanyRestaurantBase,
  Weekday,
  User,
  Role,
  Permission,
};
export const entities = [
  Partner,
  CompanyRestaurantBase,
  CompanyRestaurant,
  Weekday,
  User,
  Role,
  RolePermission,
  Permission,
  ModuleEntity,
  PaymentType,
  Category,
  Restaurant,
  Customer,
  Contrat,
  Product,
  ProductFile,
  ProductManagement,
  ProductManagementDay,
];
