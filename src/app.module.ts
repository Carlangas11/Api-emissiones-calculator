import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      load: [ EnvConfiguration ],
      validationSchema: JoiValidationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // typePaths: ['./**/*.graphql'],
      autoSchemaFile: join(process.cwd(), 'src/common/schema/appSchema.gql'),
      playground: true,
    }),
    CommonModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
