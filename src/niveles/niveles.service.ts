import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { isValidObjectId, Model } from 'mongoose'
import { setTimeout } from 'timers'

import {
  nivel1,
  nivel2,
  nivel3,
  nivel4,
  contaminantes,
} from 'src/common/bd/huellaChileDB'
import { IContaminante, INivel2, INivel3, INivel4 } from 'src/common/interfaces'
import { ContaminanteInput, UpdateContaminanteInput } from './input'
import { Nivel1, Nivel2, Nivel3, Nivel4, Contaminante } from './schema'
import { contaminanteModel } from './model'
import { contaminanteResponse } from './dto/contaminanteResponse.dto'

@Injectable()
export class NivelesService {
  constructor(
    @InjectModel(Nivel1.name)
    private nivel1Model: Model<Nivel1>,
    @InjectModel(Nivel2.name)
    private nivel2Model: Model<Nivel2>,
    @InjectModel(Nivel3.name)
    private nivel3Model: Model<Nivel3>,
    @InjectModel(Nivel4.name)
    private nivel4Model: Model<Nivel4>,
    @InjectModel(Contaminante.name)
    private contaminanteModel: Model<Contaminante>,
  ) {}

  private readonly logger = new Logger('NivelesService')

  async seed(lvl: string): Promise<string> {
    switch (lvl) {
      case '1':
        return await this.seedLvl1()
      case '2':
        return await this.seedLvl2()
      case '3':
        return await this.seedLvl3()
      case '4':
        return await this.seedLvl4()
      case 'contaminantes':
        return await this.seedContaminantes()
      default:
        throw new BadRequestException('Nivel no valido')
    }
  }

  async seedLvl1(): Promise<string> {
    this.logger.log('Seeding started')
    this.logger.log(`Seeding nivel1, ${nivel1.length} items`)
    try {
      await this.nivel1Model.deleteMany({})
      await this.nivel1Model.insertMany(nivel1)
      this.logger.log(`Finished nivel1`)
    } catch (error) {
      throw new InternalServerErrorException('Error al crear semilla nivel1')
    }
    return 'Seed nivel1 working ...'
  }
  async seedLvl2(): Promise<string> {
    this.logger.log('Seeding started')
    this.logger.log(`Seeding nivel2, ${nivel2.length} items`)
    const nivel2Related: INivel2[] = []
    nivel2.forEach(async registro => {
      const nivel1 = await this.nivel1Model.findOne({ name: registro.nivel1 })
      if (nivel1) {
        registro.nivel1 = nivel1._id
        nivel2Related.push(registro)
      }
    })
    try {
      setTimeout(async () => {
        await this.nivel2Model.deleteMany({})
        await this.nivel2Model.insertMany(nivel2Related)
        this.logger.log(`Finished nivel2`)
      }, 1500)
    } catch (error) {
      throw new InternalServerErrorException('Error al crear semilla nivel2')
    }
    return 'Seed nivel2 working ...'
  }

  async seedLvl3(): Promise<string> {
    this.logger.log('Seeding started')
    this.logger.log(`Seeding nivel3, ${nivel3.length} items`)

    const nivel3Related: INivel3[] = []
    nivel3.forEach(async registro => {
      const nivel2 = await this.nivel2Model.findOne({ name: registro.nivel2 })
      if (nivel2) {
        registro.nivel2 = nivel2._id
        nivel3Related.push(registro)
      }
    })
    try {
      setTimeout(async () => {
        await this.nivel3Model.deleteMany({})
        await this.nivel3Model.insertMany(nivel3Related)
        this.logger.log(`Finished nivel3`)
        return 'Seed nivel3 executed successfully'
      }, 3500)
    } catch (error) {
      throw new InternalServerErrorException('Error al crear semilla nivel3')
    }
    return 'Seed nivel3 working ...'
  }

  async seedLvl4(): Promise<string> {
    this.logger.log('Seeding started')
    this.logger.log(`Seeding nivel4, ${nivel4.length} items`)

    const nivel4Related: INivel4[] = []
    nivel4.forEach(async registro => {
      const nivel2 = await this.nivel2Model.findOne({ name: registro.nivel2 })
      if (nivel2) {
        registro.nivel2 = nivel2._id
      }
      const nivel3 = await this.nivel3Model.findOne({ name: registro.nivel3 })
      if (nivel3) {
        registro.nivel3 = nivel3._id
      }
      nivel4Related.push(registro)
    })
    try {
      setTimeout(async () => {
        await this.nivel4Model.deleteMany({})
        await this.nivel4Model.insertMany(nivel4Related)
        this.logger.log(`Finished nivel4`)
      }, 6000)
    } catch (error) {
      throw new InternalServerErrorException('Error al crear semilla nivel4')
    }
    return 'Seed nivel4 working ...'
  }

  async seedContaminantes(): Promise<string> {
    this.logger.log('Seeding started')
    this.logger.log(`Seeding Contaminantes, ${contaminantes.length} items`)
    const contaminantesRelated: IContaminante[] = []
    contaminantes.forEach(async registro => {
      const nivel2 = await this.nivel2Model.findOne({ name: registro.nivel2 })
      if (nivel2) {
        registro.nivel2 = nivel2._id
      }
      const nivel3 = await this.nivel3Model.findOne({ name: registro.nivel3 })
      if (nivel3) {
        registro.nivel3 = nivel3._id
      }
      const nivel4 = await this.nivel4Model.findOne({ name: registro.nivel4 })
      if (nivel4) {
        registro.nivel4 = nivel4._id
      }
      contaminantesRelated.push(registro)
    })
    try {
      setTimeout(async () => {
        await this.contaminanteModel.deleteMany({})
        await this.contaminanteModel.insertMany(contaminantesRelated)
        this.logger.log(`Finished Contaminantes`)
      }, 20000)
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al crear semilla contaminante',
      )
    }
    return 'Seed contaminantes working ...'
  }

  async findAll(lvl: string): Promise<any> {
    switch (lvl) {
      case '1':
        return await this.findAllL1()
      case '2':
        return await this.findAllL2()
      case '3':
        return await this.findAllL3()
      case '4':
        return await this.findAllL4()
      case 'contaminante':
        return await this.findAllContaminantes()
      default:
        throw new BadRequestException('Nivel no valido')
    }
  }

  async findAllContaminantes(): Promise<Contaminante[]> {
    return await this.contaminanteModel
      .find()
      .populate({
        path: 'nivel4',
        populate: {
          path: 'nivel3',
          populate: {
            path: 'nivel2',
            populate: {
              path: 'nivel1',
            },
          },
        },
      })
      .populate({
        path: 'nivel3',
        populate: {
          path: 'nivel2',
          populate: {
            path: 'nivel1',
          },
        },
      })
      .populate({
        path: 'nivel2',
        populate: {
          path: 'nivel1',
        },
      })
  }

  async getContaminantes(): Promise<contaminanteResponse[]> {
    const contaminantes = await this.contaminanteModel
      .find()
      .populate({
        path: 'nivel4',
        populate: {
          path: 'nivel3',
          populate: {
            path: 'nivel2',
            populate: {
              path: 'nivel1',
            },
          },
        },
      })
      .populate({
        path: 'nivel3',
        populate: {
          path: 'nivel2',
          populate: {
            path: 'nivel1',
          },
        },
      })
      .populate({
        path: 'nivel2',
        populate: {
          path: 'nivel1',
        },
      })

    const returnContaminantes = contaminantes.map(contaminante => {
      return {
        _id: contaminante._id,
        name: contaminante.name,
        value: contaminante.value,
        measureUnit: contaminante.measureUnit,
        nivel1: contaminante.nivel2.nivel1.name,
        nivel2: contaminante.nivel2.name,
        nivel3: contaminante.nivel3.name,
        nivel4: contaminante.nivel4.name,
      }
    })

    return returnContaminantes
  }

  async findAllL4(): Promise<Nivel4[]> {
    return await this.nivel4Model
      .find()
      .populate({
        path: 'nivel2',
        populate: {
          path: 'nivel1',
        },
      })
      .populate({
        path: 'nivel3',
        populate: {
          path: 'nivel2',
          populate: {
            path: 'nivel1',
          },
        },
      })
  }
  async findAllL3(): Promise<Nivel3[]> {
    return await this.nivel3Model.find().populate({
      path: 'nivel2',
      populate: {
        path: 'nivel1',
      },
    })
  }
  async findAllL2(): Promise<Nivel2[]> {
    return await this.nivel2Model.find().populate({ path: 'nivel1' })
  }
  async findAllL1(): Promise<Nivel1[]> {
    return await this.nivel1Model.find()
  }

  async findOne(searchId: string): Promise<any> {
    const respLevel1 = await this.nivel1Model.findById(searchId)
    if (respLevel1) return respLevel1

    const respLevel2 = await this.nivel2Model
      .findById(searchId)
      .populate({ path: 'nivel1' })
    if (respLevel2) return respLevel2

    const respLevel3 = await this.nivel3Model.findById(searchId).populate({
      path: 'nivel2',
      populate: {
        path: 'nivel1',
      },
    })
    if (respLevel3) return respLevel3

    const respLevel4 = await this.nivel4Model
      .findById(searchId)
      .populate({
        path: 'nivel2',
        populate: {
          path: 'nivel1',
        },
      })
      .populate({
        path: 'nivel3',
        populate: {
          path: 'nivel2',
          populate: {
            path: 'nivel1',
          },
        },
      })
    if (respLevel4) return respLevel4

    const respContaminante = await this.contaminanteModel
      .findById(searchId)
      .populate({
        path: 'nivel4',
        populate: {
          path: 'nivel3',
          populate: {
            path: 'nivel2',
            populate: {
              path: 'nivel1',
            },
          },
        },
      })
      .populate({
        path: 'nivel3',
        populate: {
          path: 'nivel2',
          populate: {
            path: 'nivel1',
          },
        },
      })
      .populate({
        path: 'nivel2',
        populate: {
          path: 'nivel1',
        },
      })
    if (respContaminante) return respContaminante

    throw new NotFoundException('No se encontro el registro')
  }

  // async createLevel1(nivel1Input: Nivel1Input): Promise<any> {
  //     const nivel1 = new this.nivel1Model(nivel1Input)
  //     try {
  //         return await nivel1.save()
  //     } catch (error) {
  //         throw new InternalServerErrorException(
  //             'Error al crear nivel 1, favor verifique que no exista un nivel 1 con el mismo nombre o que la base de datos este operativa',
  //         )
  //     }
  // }

  // async updateLevel1(updateNivel1Input: UpdateNivel1Input): Promise<any> {
  //     const nivel1Db = await this.nivel1Model.findById(updateNivel1Input._id)
  //     console.log(nivel1Db)
  //     if (!nivel1Db) {
  //         throw new NotFoundException('No se encontro el registro en nivel 1')
  //     }
  //     if (updateNivel1Input.name) {
  //         nivel1Db.name = updateNivel1Input.name
  //     }

  //     try {
  //         await nivel1Db.updateOne(updateNivel1Input, { new: true })
  //         return nivel1Db
  //     } catch (error) {
  //         throw new InternalServerErrorException(
  //             `Can't update Nivel 1 - Check server logs`,
  //         )
  //     }
  // }

  // async deleteLevel1(id: string): Promise<any>{
  //     const nivel1Db = await this.nivel1Model.findById(id)
  //     if (!nivel1Db) {
  //         throw new NotFoundException('No se encontro el registro en nivel 1')
  //     }
  //     try {
  //         await nivel1Db.remove()
  //         return nivel1Db
  //     } catch (error) {
  //         throw new InternalServerErrorException(
  //             `Can't delete Nivel 1 - Check server logs`,
  //         )
  //     }
  // }

  async createContaminante(contaminanteInput: ContaminanteInput): Promise<any> {
    if (!isValidObjectId(contaminanteInput.nivel2))
      throw new BadRequestException(
        `Invalid mongo id nivel2: ${contaminanteInput.nivel2}`,
      )
    if (!isValidObjectId(contaminanteInput.nivel3))
      throw new BadRequestException(
        `Invalid mongo id nivel3: ${contaminanteInput.nivel3}`,
      )
    if (!isValidObjectId(contaminanteInput.nivel4))
      throw new BadRequestException(
        `Invalid mongo id nivel4: ${contaminanteInput.nivel4}`,
      )

    if (contaminanteInput.nivel2) {
      const nivel2 = await this.nivel2Model.findById(contaminanteInput.nivel2)
      if (!nivel2)
        throw new NotFoundException('No se encontro el registro de nivel 2')
    }
    if (contaminanteInput.nivel3) {
      const nivel3 = await this.nivel3Model.findById(contaminanteInput.nivel3)
      if (!nivel3)
        throw new NotFoundException('No se encontro el registro de nivel 3')
    }
    if (contaminanteInput.nivel4) {
      const nivel4 = await this.nivel4Model.findById(contaminanteInput.nivel4)
      if (!nivel4)
        throw new NotFoundException('No se encontro el registro de nivel 4')
    }
    const contaminante = new this.contaminanteModel(contaminanteInput)
    try {
      return await contaminante.save()
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al crear contaminante, favor verifique que la base de datos este operativa',
      )
    }
  }

  async updateContaminante(
    updateContaminanteInput: UpdateContaminanteInput,
  ): Promise<any> {
    const contaminanteDb = await this.contaminanteModel.findById(
      updateContaminanteInput._id,
    )
    if (!contaminanteDb)
      throw new NotFoundException('No se encontro el registro de contaminante')

    if (updateContaminanteInput.name)
      contaminanteDb.name = updateContaminanteInput.name
    if (updateContaminanteInput.value)
      contaminanteDb.value = updateContaminanteInput.value
    if (updateContaminanteInput.measureUnit)
      contaminanteDb.measureUnit = updateContaminanteInput.measureUnit

    if (updateContaminanteInput.nivel2) {
      const nivel2 = await this.nivel2Model.findById(
        updateContaminanteInput.nivel2,
      )
      if (!nivel2)
        throw new NotFoundException('No se encontro el registro de nivel 2')
      contaminanteDb.nivel2 = nivel2._id
    }
    if (updateContaminanteInput.nivel3) {
      const nivel3 = await this.nivel3Model.findById(
        updateContaminanteInput.nivel3,
      )
      if (!nivel3)
        throw new NotFoundException('No se encontro el registro de nivel 3')
      contaminanteDb.nivel3 = nivel3._id
    }
    if (updateContaminanteInput.nivel4) {
      const nivel4 = await this.nivel4Model.findById(
        updateContaminanteInput.nivel4,
      )
      if (!nivel4)
        throw new NotFoundException('No se encontro el registro de nivel 4')
      contaminanteDb.nivel4 = nivel4._id
    }

    try {
      await contaminanteDb.updateOne(updateContaminanteInput, { new: true })
      return contaminanteDb
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't update contaminante - Check server logs`,
      )
    }
  }

  async deleteContaminante(id: string): Promise<any> {
    const contaminanteDb = await this.contaminanteModel.findById(id)
    if (!contaminanteDb) {
      throw new NotFoundException('No se encontro el registro en contaminante')
    }
    try {
      await contaminanteDb.remove()
      return contaminanteDb
    } catch (error) {
      throw new InternalServerErrorException(
        `Can't delete Contaminante - Check server logs`,
      )
    }
  }
}
