import { Module } from '@nestjs/common';
import { StockService } from './services/stock.service';
import { AlphaVanTageProvider } from './services/providers/alpha-vantage.provider';
import { StockResolver } from './resolvers/stock.resolver';

@Module({
  providers: [
    StockResolver,
    StockService,
    AlphaVanTageProvider,
  ]
})
export class StocksModule {}
