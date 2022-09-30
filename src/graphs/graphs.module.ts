import { Module } from '@nestjs/common';
import { GraphsService } from './graphs.service';
import { GraphsResolver } from './graphs.resolver';

@Module({
  providers: [GraphsResolver, GraphsService]
})
export class GraphsModule {}
