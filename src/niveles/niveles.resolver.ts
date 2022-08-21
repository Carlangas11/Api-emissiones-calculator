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
  @UseGuards(JwtAuthGuard)
  async getNivel4() {
    return await this.nivelesService.findAllL4()
  }
}
