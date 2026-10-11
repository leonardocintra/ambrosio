import { Global, Module } from '@nestjs/common';
import { CaslAbilityService } from './casl-ability/casl-ability.service.js';

@Global()
@Module({
  providers: [CaslAbilityService],
  exports: [CaslAbilityService],
})
export class CaslModule {}
