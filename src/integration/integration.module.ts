import { Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationResolver } from './integration.resolver';

@Module({
  providers: [IntegrationResolver, IntegrationService],
  exports: [IntegrationService],
})
export class IntegrationModule {}
