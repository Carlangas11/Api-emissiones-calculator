import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { JwtAuthGuard } from 'src/auth/guards'
import { nivel4Model, nivel3Model, nivel2Model, nivel1Model, contaminanteModel, ResultUnion } from './model'

import { NivelesService } from './niveles.service'

@Resolver('Niveles')
export class NivelesResolver {
    constructor(private readonly nivelesService: NivelesService) { }

    @Query(() => String, { name: 'seed', nullable: true })
    @UseGuards(JwtAuthGuard)
    async seed(@Args('lvl') lvl: string) {
        return await this.nivelesService.seed(lvl)
    }

    @Query(() => [ResultUnion], { name: 'getAllNivel', nullable: true })
    @UseGuards(JwtAuthGuard)
    async getAllNivel(@Args('lvl') lvl: string): Promise<typeof ResultUnion[]> {
        return await this.nivelesService.findAll(lvl)
    }

    @Query(() => ResultUnion, { name: 'getNivelById', nullable: true })
    @UseGuards(JwtAuthGuard)
    async getNivelById(@Args('id') id: string): Promise<typeof ResultUnion> {
        // console.log(`getNivelById: ${id}`)
        return await this.nivelesService.findOne(id)
    }
}
