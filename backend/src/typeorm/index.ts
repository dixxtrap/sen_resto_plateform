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
import { City} from './city.entity';
import { Assignment } from './assignment.entity';
import { Banner } from './banner.entity';
import { ProductRaiting } from './product_rating.entity';
import { Gift } from './gift.entity';
import { GiftHistory } from './gift_history.entity';
import { EntityProviderEnum } from './entity_provider_enum';
import { DataSource } from 'typeorm/data-source/DataSource';
import { User } from './user.entity';

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
  Assignment,
  CardAllocationDetails,
  Transac,
  WalletStatus,
  OrderProduct,
  Commission,
  OtpConfig,
  Otp,
  City,
  Banner,
  ProductRaiting,
  Gift,
  GiftHistory
];


export const entityProviders = [
  {
    provide: EntityProviderEnum.USER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.COMPANY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CompanyRestaurant ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.RESTAURANT,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Restaurant ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.DELIVER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Deliver ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.COMPANY_RESTAURANT_BASE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CompanyRestaurantBase ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.CUSTOMER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Customer ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.GIFT,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Gift ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.COORPORATE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Coorporate ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.GIFT_HISTORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(GiftHistory ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.CATEGORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category ),
    inject: ['DATA_SOURCE'],
  },
    {
    provide: EntityProviderEnum.MODULE_ENTITY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ModuleEntity ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.PERMISSION,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Permission ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.ROLE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.ROLE_PERMISSION,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RolePermission ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.CITY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(City ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.OTP_CONFIG,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OtpConfig ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.BANNER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Banner ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.OTP,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Otp ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.WALLET_STATUS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(WalletStatus ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.PAYMENT_TYPE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PaymentType ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.PRODUCT,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.PRODUCT_FILE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductFile ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.PRODUCT_MANAGEMENT,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductManagement ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.PRODUCT_MANAGEMENT_DAY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductManagementDay ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.PRODUCT_HISTORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductHistory ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.PRODUCT_CATEGORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductCategory ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.WEEKDAY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Weekday ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.ORDER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Order ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.ORDER_PRODUCT,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OrderProduct ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.CARD,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Card ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.CARD_ALLOCATION,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CardAllocation ),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: EntityProviderEnum.CARD_ALLOCATION_DETAILS,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CardAllocationDetails ),
    inject: ['DATA_SOURCE'],
  },
  ];
