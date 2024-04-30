import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoPessoaDto } from './create-tipo-pessoa.dto';

export class UpdateTipoPessoaDto extends PartialType(CreateTipoPessoaDto) {}
