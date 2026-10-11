import { ExternalCreatePessoaDto } from '../dto/external-create-pessoa.dto.js';
import { SEXO_ENUM } from 'src/commons/enums/enums.js';
import { UpdatePessoaDto } from 'src/pessoa/dto/update-pessoa.dto.js';

export class UpdatePessoaMapper {
  static toExternal(updateDto: UpdatePessoaDto): ExternalCreatePessoaDto {
    return {
      nome: updateDto.nome,
      conhecidoPor: updateDto.conhecidoPor,
      nacionalidade: updateDto.nacionalidade,
      cpf: updateDto.cpf,
      sexo: updateDto.sexo === SEXO_ENUM.MASCULINO ? 'M' : 'F',
      dataNascimento: updateDto.dataNascimento,
      estadoCivil: updateDto.estadoCivil.substring(0, 1).toUpperCase() || 'S',
      escolaridade: updateDto.escolaridade,
      foto: updateDto.foto || null,
      ativo: true,
    };
  }
}
