import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { StocksModule } from './stocks/stock.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroConfig from '../config/mikro-orm.config';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
    MikroOrmModule.forRoot({ ...mikroConfig, type: 'postgresql' }),
    StocksModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
