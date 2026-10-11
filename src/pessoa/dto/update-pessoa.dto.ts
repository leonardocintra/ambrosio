import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoaDto } from './create-pessoa.dto.js';

export class UpdatePessoaDto extends PartialType(CreatePessoaDto) {}
