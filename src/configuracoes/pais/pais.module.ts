import { Module } from '@nestjs/common';
import { PaisService } from './pais.service';
import { PaisController } from './pais.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PaisController],
  providers: [PaisService],
  imports: [HttpModule],
  exports: [PaisService]
})
export class PaisModule { }
