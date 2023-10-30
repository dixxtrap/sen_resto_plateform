import { RoleDto } from 'src/dto/role.dto';

export const roleData: RoleDto[] = [
  { name: 'ADMIN', scope: 'SUPER' },
  { name: 'MASTER', scope: 'RESTAURANT' },
  { name: 'ADMIN', scope: 'RESTAURANT' },
  { name: 'MASTER', scope: 'COMPANY' },
  { name: 'ADMIN', scope: 'COMPANY' },
  { name: 'MASTER', scope: 'RESTAURANT' },
  { name: 'DELIVERER', scope: 'RESTAURANT' },
  { name: 'MASTER', scope: 'DELIVER' },
  { name: 'CUSTOMER', scope: 'DELIVER' },
  { name: 'CUSTOMER', scope: 'CUSTOMER' },
];
