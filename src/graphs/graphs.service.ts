import { Injectable } from '@nestjs/common';
import { ITotalEmissions, ITotalEmissionsByAlcance } from '@src/common/interfaces';
import { ReportService } from '@src/report/report.service';
import { GenerateGraphsRequest, GenerateGraphsResponse } from './entities/graphs.entity';

@Injectable()
export class GraphsService {

  constructor(
    private readonly reportService: ReportService,
  ) { }


  async getGraphs({ idReport, alcances = undefined }: GenerateGraphsRequest): Promise<GenerateGraphsResponse> {

    const graphData = await this.reportService.getReportItems(idReport, alcances);

    let totalEmissions: ITotalEmissions = {
      emisionTotal: 0,
      unidadMedida: 'tonCO2eq'
    };


    let totalEmissionsByAlcance: ITotalEmissionsByAlcance = {
      'Alcance 1': {
        totalPorAlcance: {
          emisionTotal: 0,
          unidadMedida: 'tonCO2eq'
        },
        emisionesPorArea: [],
        emisionesPorNivel2: [],
        emisionesPorNivel3: [],
      },
      'Alcance 2': {
        totalPorAlcance: {
          emisionTotal: 0,
          unidadMedida: 'tonCO2eq'
        },
        emisionesPorArea: [],
        emisionesPorNivel2: [],
        emisionesPorNivel3: [],
      },
      'Alcance 3': {
        totalPorAlcance: {
          emisionTotal: 0,
          unidadMedida: 'tonCO2eq'
        },
        emisionesPorArea: [],
        emisionesPorNivel2: [],
        emisionesPorNivel3: [],
      }
    };

    const resultObject = graphData.map(itemGraph => {

      //factor de conversion a tonCO2eq
      totalEmissions.emisionTotal += itemGraph.totalEmission * 0.001;
      totalEmissionsByAlcance[`${itemGraph.nivel1}`].totalPorAlcance.emisionTotal += (itemGraph.totalEmission * 0.001);

      //Graph data por centro de costo
      if (totalEmissionsByAlcance[`${itemGraph.nivel1}`].emisionesPorArea.length === 0) {
        totalEmissionsByAlcance[`${itemGraph.nivel1}`].emisionesPorArea.push({
          nombre: itemGraph.costCenter,
          valor: (itemGraph.totalEmission * 0.001),
          unidadMedida: 'tonCO2eq'
        })
      } else {
        const indexCostCenter = totalEmissionsByAlcance[`${itemGraph.nivel1}`].emisionesPorArea.findIndex(item => item.nombre === itemGraph.costCenter);
        if (indexCostCenter === -1) {
          totalEmissionsByAlcance[`${itemGraph.nivel1}`].emisionesPorArea.push({
            nombre: itemGraph.costCenter,
            valor: (itemGraph.totalEmission * 0.001),
            unidadMedida: 'tonCO2eq'
          })
        }
        if (indexCostCenter !== -1) {
          totalEmissionsByAlcance[`${itemGraph.nivel1}`].emisionesPorArea[indexCostCenter].valor += (itemGraph.totalEmission * 0.001);
        }
      }

      //Graph data por nivel 2
      if (totalEmissionsByAlcance[`${itemGraph.nivel1}`].emisionesPorNivel2.length === 0) {
        totalEmissionsByAlcance[`${itemGraph.nivel1}`].emisionesPorNivel2.push({
          nombre: itemGraph.nivel2,
          valor: (itemGraph.totalEmission * 0.001),
          unidadMedida: 'tonCO2eq'
        })
      } else {
        const indexNivel2 = totalEmissionsByAlcance[`${itemGraph.nivel1}`].emisionesPorNivel2.findIndex(item => item.nombre === itemGraph.nivel2);
        if (indexNivel2 === -1) {
          totalEmissionsByAlcance[`${itemGraph.nivel1}`].emisionesPorNivel2.push({
            nombre: itemGraph.nivel2,
            valor: (itemGraph.totalEmission * 0.001),
            unidadMedida: 'tonCO2eq'
          })
        }
        if (indexNivel2 !== -1) {
          totalEmissionsByAlcance[`${itemGraph.nivel1}`].emisionesPorNivel2[indexNivel2].valor += (itemGraph.totalEmission * 0.001);
        }
      }

      //Graph data por nivel 3
      if (itemGraph.nivel3 !== undefined) {
        if (totalEmissionsByAlcance[`${itemGraph.nivel1}`].emisionesPorNivel3.length === 0) {
          totalEmissionsByAlcance[`${itemGraph.nivel1}`].emisionesPorNivel3.push({
            nombre: itemGraph.nivel3,
            valor: (itemGraph.totalEmission * 0.001),
            unidadMedida: 'tonCO2eq'
          })
        } else {
          const indexNivel3 = totalEmissionsByAlcance[`${itemGraph.nivel1}`].emisionesPorNivel3.findIndex(item => item.nombre === itemGraph.nivel3);
          if (indexNivel3 === -1) {
            totalEmissionsByAlcance[`${itemGraph.nivel1}`].emisionesPorNivel3.push({
              nombre: itemGraph.nivel3,
              valor: (itemGraph.totalEmission * 0.001),
              unidadMedida: 'tonCO2eq'
            })
          }
          if (indexNivel3 !== -1) {
            totalEmissionsByAlcance[`${itemGraph.nivel1}`].emisionesPorNivel3[indexNivel3].valor += (itemGraph.totalEmission * 0.001);
          }
        }
      }

    })


    let totalEmissionsByAlcanceResp = {};
    if (alcances !== undefined) {
      alcances.forEach(numberAlcance => {
        totalEmissionsByAlcanceResp[`alcance${numberAlcance}`] = totalEmissionsByAlcance[`Alcance ${numberAlcance}`]
      })
    }
    if (alcances === undefined) {
      totalEmissionsByAlcanceResp[`alcance1`] = totalEmissionsByAlcance[`Alcance 1`]
      totalEmissionsByAlcanceResp[`alcance2`] = totalEmissionsByAlcance[`Alcance 2`]
      totalEmissionsByAlcanceResp[`alcance3`] = totalEmissionsByAlcance[`Alcance 3`]
    }


    return {
      totalEmissions,
      totalEmissionsByAlcance: totalEmissionsByAlcanceResp
    }
  }

}
