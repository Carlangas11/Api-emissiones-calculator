import { Injectable } from '@nestjs/common';
import { CreateIntegrationInput } from './dto/create-integration.input';
import { UpdateIntegrationInput } from './dto/update-integration.input';
import { ParseExcelResponse } from './entities/integration.entity';
import * as XLSX from 'xlsx';
import { IResultEntry } from './interface/result.interface';

@Injectable()
export class IntegrationService {

  async parseExcel(): Promise<ParseExcelResponse> {
    const startDate = new Date();

    try {
      const workbook = XLSX.readFile('./src/integration/data/CasoMultiX.xlsx');
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { raw: true }) as IResultEntry[];

      return {
        ok: true,
        msg: 'Excel parsed successfully',
        data: xlData,
        startDate,
        endDate: new Date(),
      }

    } catch (e) {
        return {
          ok: false,
          msg: e.message,
          startDate,
          data: [],
          endDate: new Date(),
        }
    }
    


    // console.log(firstRow(xlData));
    // console.log(xlData);

    
  }
}
