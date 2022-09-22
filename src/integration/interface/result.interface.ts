export type IResultEntry = {
  Alcance: string
  FuenteDeConsumo: string
  SubfuenteDeConsumo: string
  Area: string
  Unidades: string
  ConsumoAnnual: number
  'EmisionesGEI(tCO2e)': number
}

export type IFormatoExcelImportacion = {
  Alcance: string
  'Nivel 2': string
  'Nivel 3': string
  'Nivel 4': string
  Valor: number
  'Unidad de medida': string
  Periodo: string
  Area: string
  'Factor FE': number
}

export type IFormatoExcelMultiXImportacion = {
  Alcance: string
  'Fuente de Consumo': string
  'Subfuente de Consumo': string
  Area: string
  Unidades: string
  'Consumo Anual': number
}

export type IFormatoExcelDiccionario = {
  fuenteDeConsumo: string
  subfuenteDeConsumo: string
  area: string
  unidades: string
  consumoAnual: string
  periodo: string
  Nivel1: string
  Nivel2: string
  Nivel3: string
  Nivel4: string
  Magnitud: string
  InvestigacionPropia: number
}
