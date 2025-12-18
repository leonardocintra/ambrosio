import {
  IsArray,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCarismaDaPessoaDto {
  @IsArray()
  @IsPositive({ each: true })
  carismaIds: number[];

  @IsOptional()
  @IsString()
  @MaxLength(255)
  observacao?: string;
}
