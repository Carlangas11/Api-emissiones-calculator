import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IntegrationService } from './integration.service';
import { ParseExcelResponse } from './entities/integration.entity';
import { CreateIntegrationInput } from './dto/create-integration.input';
import { UpdateIntegrationInput } from './dto/update-integration.input';

@Resolver()
export class IntegrationResolver {
  constructor(private readonly integrationService: IntegrationService) { }

  // @Query(() => ParseExcelResponse)
  // async parseExcel() {
  //   return await this.integrationService.parseExcel();
  // }

}