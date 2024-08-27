import { Module } from '@nestjs/common';
import { WalletStatusService } from './wallet_status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletStatus } from 'src/typeorm/wallet_status.entity';

@Module({
  imports:[],
  providers: [WalletStatusService],
  exports: [WalletStatusService],
})
export class WalletStatusModule {}
