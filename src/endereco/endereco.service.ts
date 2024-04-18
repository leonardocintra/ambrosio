import { Injectable } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Injectable()
export class EnderecoService {
  create(createEnderecoDto: CreateEnderecoDto) {
    return 'This action adds a new endereco';
  }

  findAll() {
    return `This action returns all endereco`;
  }

  findOne(id: number) {
    return `This action returns a #${id} endereco`;
  }

  update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    return `This action updates a #${id} endereco`;
  }

  remove(id: number) {
    return `This action removes a #${id} endereco`;
  }
}
