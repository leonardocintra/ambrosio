import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World! Bem vindo ao Caminho Neocatecumenal"', () => {
      expect(appController.getHello()).toBe('Hello World! Bem vindo ao Caminho Neocatecumenal');
    });
  });
});
