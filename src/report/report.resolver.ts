import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ReportService } from './report.service'
import { Report } from './entities/report.entity'
import { reportItemsReponse } from './dto/reportItemsResponse.dto'
import { GenerateReportInput, ReportList, ReportOutPut } from './dto/create-report.input'
import { ReportDeleteOutDto } from './dto/delete-report.dto'
import { ParseMongoIdPipe } from '@pipes'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@src/auth/guards'


@Resolver()
export class ReportResolver {
  constructor(private readonly reportService: ReportService) { }

  @Query(() => [reportItemsReponse])
  @UseGuards(JwtAuthGuard)
  async getReportItems(@Args('reportId', ParseMongoIdPipe) reportId: string): Promise<reportItemsReponse[]> {
    return await this.reportService.getReportItems(reportId)
  }

  @Query(() => Report)
  @UseGuards(JwtAuthGuard)
  async generateReportExcel() {
    return await this.reportService.generateExcelMultiXReport()
  }

  @Query(() => Report)
  @UseGuards(JwtAuthGuard)
  async generateDicionary() {
    return await this.reportService.generateDiccionary()
  }

  @Mutation(() => ReportOutPut)
  @UseGuards(JwtAuthGuard)
  async generateReport(@Args({ name: 'input', type: () => [GenerateReportInput] }) input: GenerateReportInput[]): Promise<ReportOutPut> {
    return await this.reportService.generateReport(input)
  }

  @Query(() => [ReportList])
  @UseGuards(JwtAuthGuard)
  async getReports(): Promise<ReportList[]> {
    return await this.reportService.getReports()
  }

  @Mutation(() => ReportDeleteOutDto)
  @UseGuards(JwtAuthGuard)
  async deleteReport(@Args('id', ParseMongoIdPipe) id: string): Promise<ReportDeleteOutDto> {
    return await this.reportService.deleteReport(id)
  }

}
