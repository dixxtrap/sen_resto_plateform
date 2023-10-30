import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentType, PaymentTypeHistory } from 'src/typeorm';
import { PaymentTypeController } from './payment_type.controller';
import { PaymentTypeService } from './payment_type.service';
import { JWT } from 'src/jtw';

@Module({
  imports: [JWT, TypeOrmModule.forFeature([PaymentType, PaymentTypeHistory])],
  controllers: [PaymentTypeController],
  providers: [PaymentTypeService],
})
export class PaymentTypeModule {}
