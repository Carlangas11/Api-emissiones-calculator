import { Injectable } from '@nestjs/common';
import { GenerateGraphsRequest } from './entities/graphs.entity';

@Injectable()
export class GraphsService {
  
  async getGraphs(input: GenerateGraphsRequest) {
    return 'This action adds a new graph';
  }

}
