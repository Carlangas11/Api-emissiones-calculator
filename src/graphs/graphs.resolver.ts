import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GenerateGraphsRequest, GenerateGraphsResponse } from './entities/graphs.entity';
import { GraphsService } from './graphs.service';

@Resolver()
export class GraphsResolver {
  constructor(private readonly graphsService: GraphsService) {}

  @Query(() => GenerateGraphsResponse)
  async getGraphs( @Args({ name: 'input' }) input: GenerateGraphsRequest ) {
    return await this.graphsService.getGraphs(input);
  }

}
