import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PessoaModule } from 'src/pessoa/pessoa.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PessoaModule],
})
export class UsersModule {}
