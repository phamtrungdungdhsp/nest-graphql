import { BadRequestException, Injectable } from "@nestjs/common";
import { IStockService } from '../../interfaces/index.interface';
import { RequestUtil } from '../../../ultils/request.util';
import { StockIntervalEnum, StockResolutionEnum } from '../../enums/stock.enum';
import {
  MetaData,
  StockData,
  StockDataList,
  StockPrice,
} from '../../models/stock-price.model';
import * as process from "process";
import { QueryOption } from "src/stocks/args/get-stock-price.arg";

@Injectable()
export class AlphaVanTageProvider implements IStockService {
  private hostName: string =
    process.env.ALPHA_VANTAGE_HOST || 'https://www.alphavantage.co';

  async getStockPrice(
    name: string,
    resolution: StockResolutionEnum,
    interval?: StockIntervalEnum,
    options?: QueryOption,
  ): Promise<StockPrice> {
    let url = `${this.hostName}/query?apikey=${process.env.ALPHA_VANTAGE_API_KEY}&symbol=${name}&function=${resolution}`;
    if (options.month) url += `&month=${options.month}`;
    if (options.outputSize) url += `&outputsize=${options.outputSize}`;
    if (typeof options.extendedHours === 'boolean')
      url += `&extended_hours=${options.extendedHours.toString()}`;
    if (typeof options.adjusted === 'boolean')
      url += `&extended_hours=${options.adjusted.toString()}`;
    if (
      resolution === StockResolutionEnum.TIME_SERIES_INTRADAY &&
      interval
    )
      url += `&interval=${interval}`;
    const data = await RequestUtil.get(url);
    if (data?.['Error Message']) {
      throw new BadRequestException('Error during processing.')
    }
    return this.formatAlphaVantageData(data);
  }

  private formatAlphaVantageData(input: any): StockPrice {
    const stockPrice = new StockPrice();

    const metaData = new MetaData();
    const md = input?.['Meta Data'];
    metaData.information = md?.['1. Information'];
    metaData.symbol = md?.['2. Symbol'];
    metaData.lastRefresh = md?.['3. Last Refreshed'];
    metaData.interval = md?.['4. Interval'];
    metaData.outputSise = md?.['4. Output Size'] || md?.['5. Output Size'];
    metaData.timeZone = md?.['4. Time Zone'] || md?.['5. Time Zone'];

    stockPrice.metaData = metaData;

    const stockData = new StockData();
    const key = Object.keys(input)[1];
    stockData.resolution = key;
    stockData.data = Object.entries(input[key]).map(([time, info]) => {
      const stockDataList = new StockDataList();
      stockDataList.time = time;
      stockDataList.open = info?.['1. open'];
      stockDataList.high = info?.['2. high'];
      stockDataList.low = info?.['3. low'];
      stockDataList.close = info?.['4. close'];
      stockDataList.volume = info?.['5. volume'];

      return stockDataList;
    });
    stockPrice.data = stockData;

    return stockPrice;
  }
}
