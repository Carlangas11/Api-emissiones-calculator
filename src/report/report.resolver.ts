import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReportService } from './report.service';
import { Report } from './entities/report.entity';
import { CreateReportInput } from './dto/create-report.input';
import { UpdateReportInput } from './dto/update-report.input';

@Resolver(() => Report)
export class ReportResolver {
  constructor(
    private readonly reportService: ReportService
  ) { }


  @Query(() => Report)
  async generateReport() {
    return await this.reportService.generateReport();
  }


}
