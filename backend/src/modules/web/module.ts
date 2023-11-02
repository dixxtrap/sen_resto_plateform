import { Module } from '@nestjs/common';
import { WebController } from './controller';
import { WebService } from './service';
import { PlateModule } from '../plate/plate.module';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [PlateModule, CompanyModule,],
  controllers: [WebController],
  providers: [WebService],
})
export class WebModule {}
