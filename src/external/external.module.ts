import { Module } from '@nestjs/common';
import { SendEmailService } from './send-email/send-email.service';

@Module({
  providers: [SendEmailService],
  exports: [SendEmailService],
})
export class ExternalModule {}
