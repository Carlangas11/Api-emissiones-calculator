import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { JwtAuthGuard } from '@src/auth/guards'
import { ParseMongObjectIdPipe, ParseMongoIdPipe } from '@src/common/pipes'

import { ContaminanteInput, UpdateContaminanteInput } from './input'
import { contaminanteModel, ResultUnion } from './model'
import { contaminanteResponse } from './dto/contaminanteResponse.dto'

import { NivelesService } from './niveles.service'

@Resolver('Niveles')
export class NivelesResolver {
  constructor(private readonly nivelesService: NivelesService) {}

  @Query(() => String, { name: 'seed', nullable: true })
  @UseGuards(JwtAuthGuard)
  async seed(@Args('lvl') lvl: string) {
    return await this.nivelesService.seed(lvl)
  }

  @Query(() => [ResultUnion], { name: 'getAllLevel', nullable: true })
  @UseGuards(JwtAuthGuard)
  async getAllLevel(@Args('lvl') lvl: string): Promise<typeof ResultUnion[]> {
    return await this.nivelesService.findAll(lvl)
  }

  @Query(() => ResultUnion, { name: 'getLevelById', nullable: true })
  @UseGuards(JwtAuthGuard)
  async getLevelById(
    @Args('id', ParseMongoIdPipe) id: string,
  ): Promise<typeof ResultUnion> {
    return await this.nivelesService.findOne(id)
  }

  @Query(() => contaminanteResponse)
  async getContaminantes(
    @Args('pagination') pagination?: number,
  ): Promise<contaminanteResponse> {
    return this.nivelesService.getContaminantes(pagination)
  }

  @Mutation(() => contaminanteModel, {
    name: 'createContaminante',
    nullable: true,
  })
  @UseGuards(JwtAuthGuard)
  async createContaminante(
    @Args('contaminanteInput') contaminanteInput: ContaminanteInput,
  ): Promise<typeof contaminanteModel> {
    return await this.nivelesService.createContaminante(contaminanteInput)
  }

  @Mutation(() => contaminanteModel, {
    name: 'updateContaminante',
    nullable: true,
  })
  @UseGuards(JwtAuthGuard)
  async updateContaminante(
    @Args('updateContaminanteInput', ParseMongObjectIdPipe)
    updateContaminanteInput: UpdateContaminanteInput,
  ): Promise<typeof contaminanteModel> {
    return await this.nivelesService.updateContaminante(updateContaminanteInput)
  }

  @Mutation(() => contaminanteModel, {
    name: 'deleteContaminante',
    nullable: true,
  })
  @UseGuards(JwtAuthGuard)
  async deleteContaminante(
    @Args('id', ParseMongoIdPipe) id: string,
  ): Promise<typeof contaminanteModel> {
    return await this.nivelesService.deleteContaminante(id)
  }
}
