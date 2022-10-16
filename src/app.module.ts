import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { JoiValidationSchema } from './config/joi.validation';
import { EnvConfiguration } from './config/app.config';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NivelesModule } from './niveles/niveles.module';
import { IntegrationModule } from './integration/integration.module';
import { ReportModule } from './report/report.module';
import { GraphsModule } from './graphs/graphs.module';
import { LoggerModule } from './common/logger/logger.module';
import { LoggerMiddleware } from './common/middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './common/interceptors';
import { ResourceModule } from './resource/resource.module';
import { HealthModule } from './health/health.module';

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
    NivelesModule,
    IntegrationModule,
    ReportModule,
    GraphsModule,
    LoggerModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'doc/schema'),
      renderPath: '/docs',

    }),
    ResourceModule,
    HealthModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
