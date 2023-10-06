import { registerEnumType } from '@nestjs/graphql';

export enum StockResolutionEnum {
  TIME_SERIES_INTRADAY = 'TIME_SERIES_INTRADAY',
  TIME_SERIES_DAILY = 'TIME_SERIES_DAILY',
  TIME_SERIES_DAILY_ADJUSTED = 'TIME_SERIES_DAILY_ADJUSTED',
  TIME_SERIES_WEEKLY = 'TIME_SERIES_WEEKLY',
  TIME_SERIES_WEEKLY_ADJUSTED = 'TIME_SERIES_WEEKLY_ADJUSTED',
  TIME_SERIES_MONTHLY = 'TIME_SERIES_MONTHLY',
  TIME_SERIES_MONTHLY_ADJUSTED = 'TIME_SERIES_MONTHLY_ADJUSTED',
}

registerEnumType(StockResolutionEnum, { name: 'StockResolutionEnum' });


export enum StockIntervalEnum {
  ONE_MIN = '1min',
  FIVE_MIN = '5min',
  FIFTEEN_MIN = '15min',
  THIRTY_MIN = '30min',
  ONE_HOUR = '60min'
}

registerEnumType(StockIntervalEnum, { name: 'StockIntervalEnum' });

export enum StockOutputSizeEnum {
  COMPACT = 'compact',
  FULL = 'full'
}

registerEnumType(StockOutputSizeEnum, { name: 'StockOutputSizeEnum' });