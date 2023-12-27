import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleEntity } from 'src/typeorm/module.entity';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}