import { Injectable } from '@nestjs/common';
import { CreateMacroRegiaoDto } from './dto/create-macro-regiao.dto';
import { UpdateMacroRegiaoDto } from './dto/update-macro-regiao.dto';

@Injectable()
export class MacroRegiaoService {
  create(createMacroRegiaoDto: CreateMacroRegiaoDto) {
    return 'This action adds a new macroRegiao';
  }

  findAll() {
    return `This action returns all macroRegiao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} macroRegiao`;
  }

  update(id: number, updateMacroRegiaoDto: UpdateMacroRegiaoDto) {
    return `This action updates a #${id} macroRegiao`;
  }

  remove(id: number) {
    return `This action removes a #${id} macroRegiao`;
  }
}
