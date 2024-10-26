import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { SeatingController } from './seating.controller';
import { SeatingService } from './seating.service';

@Module({
  controllers: [SeatingController],
  providers: [SeatingService],
  exports: [],
})
export class SeatingModule {}
