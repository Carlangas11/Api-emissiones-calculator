import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ReportService } from './report.service'
import { Report } from './entities/report.entity'
import { reportItemsReponse } from './dto/reportItemsResponse.dto'
import { GenerateReportInput, ReportOutPut } from './dto/create-report.input'
import { ParseExcelMultiXResponse } from '@src/integration/entities/integration.entity'

@Resolver()
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Query(() => [reportItemsReponse])
  async getReportItems(@Args('reportId') reportId: string): Promise<reportItemsReponse[]> {
    return await this.reportService.getReportItems(reportId)
  }

  @Query(() => Report)
  async generateReportExcel() {
    return await this.reportService.generateExcelMultiXReport()
  }
  
  @Query(() => Report)
  async generateDicionary() {
    return await this.reportService.generateDiccionary()
  }

  @Mutation(() => ReportOutPut)
  async generateReport(
    @Args({ name: 'input', type: () => [GenerateReportInput] })
    input: GenerateReportInput[],
  ): Promise<ReportOutPut> {
    return await this.reportService.generateReport(input)
  }
}
