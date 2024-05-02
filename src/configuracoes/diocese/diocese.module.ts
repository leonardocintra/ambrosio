import { Module } from '@nestjs/common';
import { DioceseService } from './diocese.service';
import { DioceseController } from './diocese.controller';

@Module({
  controllers: [DioceseController],
  providers: [DioceseService],
})
export class DioceseModule {}
