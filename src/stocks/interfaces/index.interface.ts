import { StockPrice } from '../models/stock-price.model';
import { StockIntervalEnum, StockResolutionEnum } from '../enums/stock.enum';
import { QueryOption } from '../args/get-stock-price.arg';


export interface IStockService {
  getStockPrice(
    name: string,
    resolution: StockResolutionEnum,
    interval?: StockIntervalEnum,
    options?: QueryOption,
  ): Promise<StockPrice>;
}
