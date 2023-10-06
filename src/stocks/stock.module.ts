import { Module } from '@nestjs/common';
import { StockService } from './services/stock.service';
import { AlphaVanTageProvider } from './services/providers/alpha-vantage.provider';
import { StockResolver } from './resolvers/stock.resolver';
import { StockBoardEntity } from './entities/stock-board.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([StockBoardEntity])],
  providers: [StockResolver, StockService, AlphaVanTageProvider],
})
export class StocksModule {}
