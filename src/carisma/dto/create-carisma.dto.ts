import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCarismaDto {
  @IsString()
  @MaxLength(100)
  descricao: string;

  @IsEnum(['PRIMITIVO', 'SERVICO', 'VINCULADO'])
  @IsString()
  @MaxLength(20)
  tipo: string;

  @IsOptional()
  @IsBoolean()
  casalAndaJunto?: boolean;
}
