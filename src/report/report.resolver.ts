import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ReportService } from './report.service'
import { Report } from './entities/report.entity'
import { reportItemsReponse } from './dto/reportItemsResponse.dto'

@Resolver()
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Query(() => [reportItemsReponse])
  async getReportItems(@Args('reportId') reportId: string): Promise<reportItemsReponse[]> {
    return await this.reportService.getReportItems(reportId)
  }

  @Query(() => Report)
  async generateReport() {
    return await this.reportService.generateExcelMultiXReport()
  }
  
  @Query(() => Report)
  async generateDicionary() {
    return await this.reportService.generateDiccionary()
  }

  
}
