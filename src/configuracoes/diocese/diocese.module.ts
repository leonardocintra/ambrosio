import { Module } from '@nestjs/common';
import { DioceseService } from './diocese.service';
import { DioceseController } from './diocese.controller';
import { EnderecoModule } from 'src/endereco/endereco.module';

@Module({
  controllers: [DioceseController],
  providers: [DioceseService],
  imports: [EnderecoModule],
})
export class DioceseModule {}
