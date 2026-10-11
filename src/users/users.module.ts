import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { PessoaModule } from 'src/pessoa/pessoa.module.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PessoaModule],
  exports: [UsersService],
})
export class UsersModule {}
