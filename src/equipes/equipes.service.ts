import { Injectable } from '@nestjs/common';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';

@Injectable()
export class EquipesService {
  create(createEquipeDto: CreateEquipeDto) {
    return 'This action adds a new equipe';
  }

  findAll() {
    return `This action returns all equipes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipe`;
  }

  update(id: number, updateEquipeDto: UpdateEquipeDto) {
    return `This action updates a #${id} equipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipe`;
  }
}
