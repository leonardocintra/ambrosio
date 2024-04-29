import { Module } from '@nestjs/common';
import { EquipesService } from './equipes.service';
import { EquipesController } from './equipes.controller';

@Module({
  controllers: [EquipesController],
  providers: [EquipesService],
})
export class EquipesModule {}
