import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from '@src/auth/guards';
import { GenerateGraphsRequest, GenerateGraphsResponse } from './entities/graphs.entity';
import { GraphsService } from './graphs.service';

@Resolver()
export class GraphsResolver {
  constructor(private readonly graphsService: GraphsService) { }

  @Query(() => GenerateGraphsResponse)
  @UseGuards(JwtAuthGuard)
  async getGraphs(@Args({ name: 'input' }) input: GenerateGraphsRequest) {
    return await this.graphsService.getGraphs(input);
  }

}
