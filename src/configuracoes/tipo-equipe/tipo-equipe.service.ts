import { Injectable } from '@nestjs/common';
import { CreateTipoEquipeDto } from './dto/create-tipo-equipe.dto';
import { UpdateTipoEquipeDto } from './dto/update-tipo-equipe.dto';

@Injectable()
export class TipoEquipeService {
  create(createTipoEquipeDto: CreateTipoEquipeDto) {
    return 'This action adds a new tipoEquipe';
  }

  findAll() {
    return `This action returns all tipoEquipe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoEquipe`;
  }

  update(id: number, updateTipoEquipeDto: UpdateTipoEquipeDto) {
    return `This action updates a #${id} tipoEquipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoEquipe`;
  }
}
