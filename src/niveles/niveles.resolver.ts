import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards';
import { NivelesService } from './niveles.service';

@Resolver('Niveles')
export class NivelesResolver {
    constructor(private readonly nivelesService: NivelesService) { }

    @Query(() => String, { name: 'seed', nullable: true })
    @UseGuards(JwtAuthGuard)
    async seed(@Args('lvl') lvl: string) {
        return await this.nivelesService.seed(lvl);
    }
    


}


