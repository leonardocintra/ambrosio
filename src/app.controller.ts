import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('App CNC')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'Retorna uma saudação' })
  @ApiResponse({ status: 503, description: 'Serviço indisponível no momento' })
  @ApiBody({
    description: 'Exemplo de resposta',
    examples: {
      saudacao: {
        summary: 'Saudação padrão',
        value: 'Hello World! Bem vindo ao Caminho Neocatecumenal',
      },
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOkResponse({
    description: 'Retorna uma resposta de verificação de saúde',
  })
  health(): string {
    return this.appService.getPing();
  }
}
