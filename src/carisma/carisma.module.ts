import { Module } from '@nestjs/common';
import { CarismaService } from './carisma.service';
import { CarismaController } from './carisma.controller';
import { PessoaModule } from 'src/pessoa/pessoa.module';

@Module({
  controllers: [CarismaController],
  providers: [CarismaService],
  exports: [CarismaService],
  imports: [PessoaModule],
})
export class CarismaModule {}
