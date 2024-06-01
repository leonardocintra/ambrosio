import { IsIn, IsString } from 'class-validator';

export class SexoQueryParamDto {
  @IsString()
  @IsIn(['M', 'F', 'm', 'f'], { message: 'o sexo deve ter o valor de M ou F' })
  sexo: string;
}
