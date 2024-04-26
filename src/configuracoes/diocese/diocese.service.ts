import { Injectable } from '@nestjs/common';
import { CreateDioceseDto } from './dto/create-diocese.dto';
import { UpdateDioceseDto } from './dto/update-diocese.dto';

@Injectable()
export class DioceseService {
  create(createDioceseDto: CreateDioceseDto) {
    return 'This action adds a new diocese';
  }

  findAll() {
    return `This action returns all diocese`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diocese`;
  }

  update(id: number, updateDioceseDto: UpdateDioceseDto) {
    return `This action updates a #${id} diocese`;
  }

  remove(id: number) {
    return `This action removes a #${id} diocese`;
  }
}
