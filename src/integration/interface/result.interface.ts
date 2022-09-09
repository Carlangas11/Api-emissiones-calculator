export type IResultEntry = {
  Alcance: string;
  FuenteDeConsumo: string;
  SubfuenteDeConsumo: string;
  Area: string;
  Unidades: string;
  ConsumoAnnual: number;
  'EmisionesGEI(tCO2e)': number;
}

export type IFormatoExcelImportacion = {
  Alcance: string;
  'Nivel 2': string;
  'Nivel 3': string;
  'Nivel 4': string;
  Valor: number;
  'Unidad de medida': string;
  Periodo: string;
  Area: string;
  'Factor FE': number;
}