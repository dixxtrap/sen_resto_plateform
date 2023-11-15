import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/typeorm';
import { PaymentController } from './controller';
import { PaymentService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
