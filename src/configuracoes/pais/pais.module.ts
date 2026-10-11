import { Module } from '@nestjs/common';
import { PaisService } from './pais.service.js';
import { PaisController } from './pais.controller.js';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PaisController],
  providers: [PaisService],
  imports: [HttpModule],
  exports: [PaisService]
})
export class PaisModule { }
