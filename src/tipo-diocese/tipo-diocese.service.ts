import { Injectable } from '@nestjs/common';
import { CreateTipoDioceseDto } from './dto/create-tipo-diocese.dto';
import { UpdateTipoDioceseDto } from './dto/update-tipo-diocese.dto';

@Injectable()
export class TipoDioceseService {
  create(createTipoDioceseDto: CreateTipoDioceseDto) {
    return 'This action adds a new tipoDiocese';
  }

  findAll() {
    return `This action returns all tipoDiocese`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoDiocese`;
  }

  update(id: number, updateTipoDioceseDto: UpdateTipoDioceseDto) {
    return `This action updates a #${id} tipoDiocese`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoDiocese`;
  }
}
