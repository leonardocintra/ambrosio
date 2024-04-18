import { Injectable } from '@nestjs/common';

@Injectable()
export class TipoCarismaService {
  findAll() {
    return `This action returns all tipoCarisma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoCarisma`;
  }
}
