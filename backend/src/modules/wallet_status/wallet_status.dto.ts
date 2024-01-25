import { ApiProperty } from '@nestjs/swagger';
export enum WalletStatusEnum {
  credit = 'CREDIT',
  debit = 'DEBIT',
  init = 'INIT',
}
export class WalletStatusTransactDto {
  amount: number;
  type: WalletStatusEnum;
  entityId: number;
  transactionId: number;
}
export class WalletStatusDto {
  @ApiProperty()
  entityId?: number;
  @ApiProperty()
  totalCredit?: number;
  @ApiProperty()
  totalDebit?: number;
  @ApiProperty()
  transactionId?: number;
  status?: boolean;
}
