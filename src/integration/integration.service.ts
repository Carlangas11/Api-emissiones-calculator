import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

import { ParseExcelDiccionaryResponse, ParseExcelResponse } from './entities/integration.entity';
import { IFormatoExcelDiccionario, IFormatoExcelImportacion } from './interface/result.interface';

@Injectable()
export class IntegrationService {

  async parseExcel(): Promise<ParseExcelResponse> {
    const startDate = new Date();

    try {
      // const workbook = XLSX.readFile('./src/integration/data/CasoMultiX.xlsx');
      const workbook = XLSX.readFile('./src/integration/data/FormatoExcelImportacion.xlsx');
      // const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { raw: true }) as IFormatoExcelImportacion[];

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
  }

  async parseDiccionaryExcel(): Promise<ParseExcelDiccionaryResponse> {
    const startDate = new Date();

    try {
      const workbook = XLSX.readFile('./src/common/bd/DiccionarioMultiX.xlsx');
      const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { raw: true }) as IFormatoExcelDiccionario[];
      return {
        ok: true,
        msg: 'Excel parsed successfully',
        data: excelData,
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
  }
}
