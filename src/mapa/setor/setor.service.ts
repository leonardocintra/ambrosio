import { Injectable } from '@nestjs/common';
import { CreateSetorDto } from './dto/create-setor.dto';
import { UpdateSetorDto } from './dto/update-setor.dto';

@Injectable()
export class SetorService {
  create(createSetorDto: CreateSetorDto) {
    return 'This action adds a new setor';
  }

  findAll() {
    return `This action returns all setor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} setor`;
  }

  update(id: number, updateSetorDto: UpdateSetorDto) {
    return `This action updates a #${id} setor`;
  }

  remove(id: number) {
    return `This action removes a #${id} setor`;
  }
}
