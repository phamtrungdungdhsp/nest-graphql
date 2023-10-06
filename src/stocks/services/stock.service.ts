import { Injectable } from '@nestjs/common';
import { StockPrice } from '../models/stock-price.model';
import { StockIntervalEnum, StockResolutionEnum } from '../enums/stock.enum';
import { IStockService } from '../interfaces/index.interface';
import { AlphaVanTageProvider } from './providers/alpha-vantage.provider';
import { QueryOption } from '../args/get-stock-price.arg';

@Injectable()
export class StockService {
  private stockProvider: IStockService;
  constructor(private alphaVantageProvider: AlphaVanTageProvider) {
    this.stockProvider = this.stockProviderFactory();
  }
  async getStockPrice(
    name: string,
    resolution: StockResolutionEnum,
    interval?: StockIntervalEnum,
    options?: QueryOption,
  ): Promise<StockPrice> {
    return this.stockProvider.getStockPrice(name, resolution, interval, options);
  }

  private stockProviderFactory(): IStockService {
    return this.alphaVantageProvider;
  }
}
