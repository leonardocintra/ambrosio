import { Module } from '@nestjs/common';
import { CaslAbilityService } from './casl-ability/casl-ability.service';

@Module({
  providers: [CaslAbilityService]
})
export class CaslModule {}
