import { Injectable } from '@nestjs/common';

@Injectable()
export class TipoDioceseService {
  findAll() {
    return `This action returns all tipoDiocese`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoDiocese`;
  }
}
