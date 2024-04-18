import { Injectable } from '@nestjs/common';
import { CreateTipoCarismaDto } from './dto/create-tipo-carisma.dto';
import { UpdateTipoCarismaDto } from './dto/update-tipo-carisma.dto';

@Injectable()
export class TipoCarismaService {
  create(createTipoCarismaDto: CreateTipoCarismaDto) {
    return 'This action adds a new tipoCarisma';
  }

  findAll() {
    return `This action returns all tipoCarisma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoCarisma`;
  }

  update(id: number, updateTipoCarismaDto: UpdateTipoCarismaDto) {
    return `This action updates a #${id} tipoCarisma`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoCarisma`;
  }
}
