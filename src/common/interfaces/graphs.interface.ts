export interface IGraphEmisionesPorArea {
    nombre: string;
    valor: number;
    unidadMedida: string;
}

export interface IGraphEmisionesPorNivel2 {
    nombre: string;
    valor: number;
    unidadMedida: string;
}

export interface IGraphEmisionesPorNivel3 {
    nombre: string;
    valor: number;
    unidadMedida: string;
}

export interface ITotalEmissions {
    emisionTotal: number;
    unidadMedida: string;
}

export interface IGraphData {
    totalPorAlcance? : ITotalEmissions;
    emisionesPorUnidad?: IGraphEmisionesPorArea[];
    emisionesPorNivel2?: IGraphEmisionesPorNivel2[];
    emisionesPorNivel3?: IGraphEmisionesPorNivel3[];
}

export interface ITotalEmissionsByAlcance {
    "Alcance 1"?: IGraphData;
    "Alcance 2"?: IGraphData;
    "Alcance 3"?: IGraphData;
}
