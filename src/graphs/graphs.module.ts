import { Module } from '@nestjs/common';
import { GraphsService } from './graphs.service';
import { GraphsResolver } from './graphs.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportItem, ReportItemSchema } from '@src/report/schema';
import { ReportModule } from '@src/report/report.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReportItem.name, schema: ReportItemSchema },
    ]),
    ReportModule,
  ],
  providers: [GraphsResolver, GraphsService]
})
export class GraphsModule {}
