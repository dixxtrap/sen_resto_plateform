import { Company } from './company';
import { Role } from './role';
import { Restaurant } from './restaurant';
import { Permission } from './permission';
import { User } from './user';
import { PermissionUser } from './permission_user';
import { PermissionRole } from './permission_role';
import { Plate } from './plate';
import { RestaurantContact } from './restaurant_contact';
import { CompanyContact } from './company_contact';
import { Contact } from './contact';

import { PaymentType } from './payment_type';
import { Payment } from './payment';
import { Order } from './order';
import { FileDocument } from './document';
import { PlateFile } from './plate_file';
import { Tag } from './tag';
import { TagPlate } from './tag_plat';
import { Customer } from './customer';
import { OrderPlate } from './order_plate';
import { PlateHistory } from './plate_amount';
import { PaymentTypeHistory } from './payment_type_history';

// export
export {
  Company,
  Role,
  Restaurant,
  Permission,
  User,
  PermissionUser,
  PermissionRole,
  Plate,
  RestaurantContact,
  Customer,
  CompanyContact,
  Contact,
  PaymentType,
  PaymentTypeHistory,
  Payment,
  Order,
  FileDocument,
  PlateFile,
  TagPlate,
  Tag,
  OrderPlate,
  PlateHistory,
};
export const entities = [
  Company,
  Role,
  Restaurant,
  Permission,
  User,
  PermissionUser,
  PermissionRole,
  Plate,
  RestaurantContact,
  CompanyContact,

  Customer,

  PaymentType,
  PaymentTypeHistory,
  Payment,
  Order,
  FileDocument,
  PlateFile,
  TagPlate,
  Tag,
  OrderPlate,
  PlateHistory,
];
