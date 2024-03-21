import {
  CompanyRestaurantBase,
  CompanyRestaurant,
  Restaurant,
  Coorporate,
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
import { ProductHistory } from './product_history.entity';
import { Order } from './order.entity';
import { Deliver } from './deliver.entity';
import { CardAllocation } from './card_allocation.entity';
import { ProductCategory } from './product_category.entity';
import { Card } from './card.entity';
import { CardAllocationDetails } from './card_allocation_details.entity';
import { Transac } from './transaction.entity';
import { WalletStatus } from './wallet_status.entity';
import { OrderProduct } from './order_product.entity';
import { Commission } from './commission.entity';
import { OtpConfig } from './otp_config';
import { Otp } from './otp.entity';
import { City, Commune, Region } from './city.entity';

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
  Coorporate,
  Deliver,
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
  ProductCategory,
  ProductFile,
  ProductManagement,
  ProductManagementDay,
  ProductHistory,
  Order,
  CardAllocation,
  Card,
  CardAllocationDetails,
  Transac,
  WalletStatus,
  OrderProduct,
  Commission,
  OtpConfig,
  Otp,
  Region,
  City,
  Commune
];
