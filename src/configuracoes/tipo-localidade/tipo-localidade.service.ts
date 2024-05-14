import { Injectable } from '@nestjs/common';
import { CreateTipoLocalidadeDto } from './dto/create-tipo-localidade.dto';
import { UpdateTipoLocalidadeDto } from './dto/update-tipo-localidade.dto';

@Injectable()
export class TipoLocalidadeService {
  create(createTipoLocalidadeDto: CreateTipoLocalidadeDto) {
    return 'This action adds a new tipoLocalidade';
  }

  findAll() {
    return `This action returns all tipoLocalidade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoLocalidade`;
  }

  update(id: number, updateTipoLocalidadeDto: UpdateTipoLocalidadeDto) {
    return `This action updates a #${id} tipoLocalidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoLocalidade`;
  }
}
