import { Injectable } from '@nestjs/common';
import { CreateEscolaridadeDto } from './dto/create-escolaridade.dto';
import { UpdateEscolaridadeDto } from './dto/update-escolaridade.dto';

@Injectable()
export class EscolaridadeService {
  create(createEscolaridadeDto: CreateEscolaridadeDto) {
    return 'This action adds a new escolaridade';
  }

  findAll() {
    return `This action returns all escolaridade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} escolaridade`;
  }

  update(id: number, updateEscolaridadeDto: UpdateEscolaridadeDto) {
    return `This action updates a #${id} escolaridade`;
  }

  remove(id: number) {
    return `This action removes a #${id} escolaridade`;
  }
}
