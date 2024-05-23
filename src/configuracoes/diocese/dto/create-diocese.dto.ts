import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateTipoDioceseDto } from 'src/configuracoes/tipo-diocese/dto/create-tipo-diocese.dto';

export class CreateDioceseDto {
  @IsPositive()
  @IsNumber()
  id: number;

  @IsString()
  @MaxLength(50)
  descricao: string;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateTipoDioceseDto)
  tipoDiocese: CreateTipoDioceseDto;
}
