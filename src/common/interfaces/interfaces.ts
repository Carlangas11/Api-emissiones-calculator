export interface INivel1 {
  name: string
}

export interface INivel2 {
  nivel1: string
  name: string
}

export interface INivel3 {
  nivel2: string
  name: string
}

export interface INivel4 {
  nivel2: string
  nivel3: string
  name: string
}

export interface IContaminante {
  nivel2: string
  nivel3: string
  nivel4: string
  name: string
  value: number
  measureUnit: string
}

export interface IMeasureUnit {
  magnitud: string
  si: string
  equivalencias: IMesureUnitsEquivalent[] 
}

export interface IMesureUnitsEquivalent {
    name: string
    value: number
    alias: string[]
}
