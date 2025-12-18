import { Injectable } from '@nestjs/common';
import { CreateEtapaDto } from './dto/create-etapa.dto';
import { UpdateEtapaDto } from './dto/update-etapa.dto';

@Injectable()
export class EtapaService {
  create(createEtapaDto: CreateEtapaDto) {
    return 'This action adds a new etapa';
  }

  findAll() {
    return `This action returns all etapa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} etapa`;
  }

  update(id: number, updateEtapaDto: UpdateEtapaDto) {
    return `This action updates a #${id} etapa`;
  }

  remove(id: number) {
    return `This action removes a #${id} etapa`;
  }
}
