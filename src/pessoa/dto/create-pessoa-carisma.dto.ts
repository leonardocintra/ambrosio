import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO para cada item de carisma
class CarismaItemDto {
  @IsInt()
  id: number;

  @IsString()
  descricao: string;
}

// Validador customizado para garantir que pelo menos um array de carisma tenha elementos
@ValidatorConstraint({ name: 'hasAtLeastOneCarisma', async: false })
export class HasAtLeastOneCarismaConstraint
  implements ValidatorConstraintInterface
{
  validate(carismas: CarismasDto) {
    const { primitivos, vinculados, servicos } = carismas;

    const hasPrimitivos = primitivos && primitivos.length > 0;
    const hasVinculados = vinculados && vinculados.length > 0;
    const hasServicos = servicos && servicos.length > 0;

    return hasPrimitivos || hasVinculados || hasServicos;
  }

  defaultMessage() {
    return 'Pelo menos um tipo de carisma deve ser informado';
  }
}

// DTO para agrupar os tipos de carisma
class CarismasDto {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: 'Primitivos deve ter pelo menos 1 item' })
  @ValidateNested({ each: true })
  @Type(() => CarismaItemDto)
  primitivos?: CarismaItemDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: 'Vinculados deve ter pelo menos 1 item' })
  @ValidateNested({ each: true })
  @Type(() => CarismaItemDto)
  vinculados?: CarismaItemDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: 'Servicos deve ter pelo menos 1 item' })
  @ValidateNested({ each: true })
  @Type(() => CarismaItemDto)
  servicos?: CarismaItemDto[];
}

// DTO principal
export class CreatePessoaCarismasDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CarismasDto)
  @Validate(HasAtLeastOneCarismaConstraint)
  carismas: CarismasDto;
}
