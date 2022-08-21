import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { JwtAuthGuard } from 'src/auth/guards'
import { ParseMongoIdPipe } from 'src/common/pipes'
import { Nivel1Input, UpdateNivel1Input } from './input'
import {
  nivel4Model,
  nivel3Model,
  nivel2Model,
  nivel1Model,
  contaminanteModel,
  ResultUnion,
} from './model'

import { NivelesService } from './niveles.service'

@Resolver('Niveles')
export class NivelesResolver {
  constructor(private readonly nivelesService: NivelesService) {}

  @Query(() => String, { name: 'seed', nullable: true })
  @UseGuards(JwtAuthGuard)
  async seed(@Args('lvl') lvl: string) {
    return await this.nivelesService.seed(lvl)
  }

  @Query(() => [nivel4Model])
  //   @UseGuards(JwtAuthGuard)
  async getNivel4() {
    return await this.nivelesService.findAllL4()
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

  @Mutation(() => nivel1Model, { name: 'createNivel1', nullable: true })
  @UseGuards(JwtAuthGuard)
  async createNivel1(
    @Args('nivel1Input') nivel1Input: Nivel1Input,
  ): Promise<typeof nivel1Model> {
    return await this.nivelesService.createLevel1(nivel1Input)
  }

  @Mutation(() => nivel1Model, { name: 'updateNivel1', nullable: true })
  @UseGuards(JwtAuthGuard)
  async updateNivel1(
    @Args('updateNivel1Input') updateNivel1Input: UpdateNivel1Input,
  ): Promise<typeof nivel1Model> {
    return await this.nivelesService.updateLevel1(updateNivel1Input)
  }
}
