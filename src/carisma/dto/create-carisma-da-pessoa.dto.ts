import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCarismaDaPessoaDto {
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  carismaIds: number[];

  @IsOptional()
  @IsString()
  @MaxLength(255)
  observacao?: string;
}
