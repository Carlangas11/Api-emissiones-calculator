import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { JwtAuthGuard } from 'src/auth/guards'
import { ParseMongObjectIdPipe, ParseMongoIdPipe } from 'src/common/pipes'
import { ContaminanteInput, UpdateContaminanteInput } from './input'
import { contaminanteModel, ResultUnion } from './model'
import { contaminanteOutput } from './model/contaminanteOutput.model'

import { NivelesService } from './niveles.service'

@Resolver('Niveles')
export class NivelesResolver {
  constructor(private readonly nivelesService: NivelesService) {}

  @Query(() => String, { name: 'seed', nullable: true })
  @UseGuards(JwtAuthGuard)
  async seed(@Args('lvl') lvl: string) {
    return await this.nivelesService.seed(lvl)
  }

  @Query(() => [contaminanteOutput])
  async getContaminantes(): Promise<contaminanteOutput[]> {
    return this.nivelesService.getContaminantes()
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

    // @Mutation(() => nivel1Model, { name: 'createNivel1', nullable: true })
    // @UseGuards(JwtAuthGuard)
    // async createNivel1(@Args('nivel1Input') nivel1Input: Nivel1Input ): Promise<typeof nivel1Model> {
    //     return await this.nivelesService.createLevel1(nivel1Input)
    // }

    // @Mutation(() => nivel1Model, { name: 'updateNivel1', nullable: true })
    // @UseGuards(JwtAuthGuard)
    // async updateNivel1(@Args('updateNivel1Input', ParseMongObjectIdPipe) updateNivel1Input: UpdateNivel1Input ): Promise<typeof nivel1Model> {
    //     return await this.nivelesService.updateLevel1(updateNivel1Input)
    // }

    // @Mutation(() => nivel1Model, { name: 'deleteNivel1', nullable: true })
    // @UseGuards(JwtAuthGuard)
    // async deleteNivel1(@Args('id', ParseMongoIdPipe) id: string ): Promise<any> {
    //     return await this.nivelesService.deleteLevel1(id)
    // }

    @Mutation(() => contaminanteModel, { name: 'createContaminante', nullable: true })
    @UseGuards(JwtAuthGuard)
    async createContaminante(@Args('contaminanteInput') contaminanteInput: ContaminanteInput ): Promise<typeof contaminanteModel> {
        return await this.nivelesService.createContaminante(contaminanteInput)
    }

    @Mutation(() => contaminanteModel, { name: 'updateContaminante', nullable: true })
    @UseGuards(JwtAuthGuard)
    async updateContaminante(@Args('updateContaminanteInput', ParseMongObjectIdPipe) updateContaminanteInput: UpdateContaminanteInput ): Promise<typeof contaminanteModel> {
        return await this.nivelesService.updateContaminante(updateContaminanteInput)
    }

    @Mutation(() => contaminanteModel, { name: 'deleteContaminante', nullable: true })
    @UseGuards(JwtAuthGuard)
    async deleteContaminante(@Args('id', ParseMongoIdPipe) id: string ): Promise<typeof contaminanteModel> {
        return await this.nivelesService.deleteContaminante(id)
    }
}
